import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';

const Modal = ({ 
  isOpen, onClose, title, children, 
  onConfirm, confirmText = "OK", cancelText = "Cancel", 
  isDanger = false, isInfo = false 
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'modalBgIn 0.2s ease-out',
        padding: '20px',
      }}
    >
      <div style={{
        background: '#ffffff',
        width: '100%', 
        maxWidth: '460px',
        borderRadius: '24px', 
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04)',
        animation: 'modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        fontFamily: "'Google Sans', 'Roboto', system-ui, sans-serif",
      }}>
        {/* Colored top bar */}
        <div style={{
          height: '4px',
          background: isDanger 
            ? 'linear-gradient(90deg, #d93025, #f44336)' 
            : 'linear-gradient(90deg, #1a73e8, #4285f4)',
        }} />

        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 24px 16px',
          borderBottom: '1px solid #f1f3f4',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isDanger && (
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fce8e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} color="#d93025" />
              </div>
            )}
            {isInfo && (
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={18} color="#1a73e8" />
              </div>
            )}
            <h3 style={{ 
              fontSize: '1.1rem', fontWeight: '600', color: '#202124',
              margin: 0, letterSpacing: '-0.2px' 
            }}>{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'transparent', border: 'none', color: '#5f6368', 
              cursor: 'pointer', padding: '8px', borderRadius: '10px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f1f3f4'; e.currentTarget.style.color = '#202124'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5f6368'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ 
          padding: '20px 24px', 
          color: '#5f6368', 
          fontSize: '0.95rem', 
          lineHeight: '1.6',
          minHeight: '60px',
        }}>
          {children}
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', gap: '10px', justifyContent: 'flex-end',
          padding: '16px 24px 20px',
          background: '#fafafa',
          borderTop: '1px solid #f1f3f4',
        }}>
          <button 
            onClick={onClose}
            style={{ 
              padding: '10px 24px', borderRadius: '20px', border: 'none', 
              background: 'transparent', color: '#1a73e8', fontWeight: '500', 
              cursor: 'pointer', fontSize: '0.9rem', 
              fontFamily: "'Google Sans', 'Roboto', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e8f0fe'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button 
              onClick={onConfirm}
              style={{
                padding: '10px 24px', borderRadius: '20px', border: 'none',
                background: isDanger 
                  ? 'linear-gradient(135deg, #d93025, #f44336)' 
                  : 'linear-gradient(135deg, #1a73e8, #4285f4)',
                color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem',
                fontFamily: "'Google Sans', 'Roboto', sans-serif",
                boxShadow: isDanger 
                  ? '0 2px 8px rgba(217,48,37,0.3)' 
                  : '0 2px 8px rgba(26,115,232,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = isDanger ? '0 4px 14px rgba(217,48,37,0.4)' : '0 4px 14px rgba(26,115,232,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isDanger ? '0 2px 8px rgba(217,48,37,0.3)' : '0 2px 8px rgba(26,115,232,0.3)'; }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { transform: scale(0.88) translateY(16px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Modal;
