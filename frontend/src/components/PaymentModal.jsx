import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Loader2, Calendar, ShieldCheck, ShieldAlert } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, onSuccess, billingCycle }) => {
  const [step, setStep] = useState('input'); // 'input' | 'processing' | 'success'
  const [formData, setFormData] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [focused, setFocused] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'number') val = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    if (name === 'expiry') val = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
    if (name === 'cvc') val = value.replace(/\D/g, '').slice(0, 3);
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(plan.name);
        onClose();
        // Reset for next time
        setTimeout(() => setStep('input'), 500);
      }, 2000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{ 
            width: '100%', maxWidth: '480px', background: '#fff', borderRadius: '32px', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden', position: 'relative',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {step === 'input' && (
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>Secure Checkout</h3>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', marginTop: '4px' }}>Subscribe to {plan.name} Plan</p>
                </div>
                <button onClick={onClose} style={{ padding: '8px', borderRadius: '50%', border: 'none', background: '#F3F4F6', cursor: 'pointer' }}><X size={20} color="#374151" /></button>
              </div>

              {/* Order Summary */}
              <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>Total Due Now</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>₹{billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#374151' }}>{plan.name} Subscription</p>
                   <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Billed {billingCycle}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Cardholder Name</label>
                    <input required name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '0.95rem', transition: '0.2s', outline: 'none' }} onFocus={() => setFocused('name')} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                        <input required name="number" placeholder="0000 0000 0000 0000" value={formData.number} onChange={handleInputChange} style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '0.95rem', transition: '0.2s', outline: 'none' }} onFocus={() => setFocused('number')} />
                        <CreditCard size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Expiry Date</label>
                        <input required name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '0.95rem', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>CVC</label>
                        <div style={{ position: 'relative' }}>
                            <input required name="cvc" type="password" placeholder="***" value={formData.cvc} onChange={handleInputChange} style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '0.95rem', outline: 'none' }} />
                            <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '14px', border: 'none', background: '#1a73e8', color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        Pay ₹{billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                    </button>
                    <p style={{ fontSize: '0.72rem', color: '#9CA3AF', textAlign: 'center', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <ShieldCheck size={14} /> Encrypted and Secure Payment via Razorpay
                    </p>
                </div>
              </form>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ padding: '80px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div 
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ color: '#1a73e8', marginBottom: '24px' }}
              >
                <Loader2 size={64} strokeWidth={1.5} />
              </motion.div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>Processing Payment</h3>
              <p style={{ fontSize: '0.95rem', color: '#6B7280', marginTop: '8px' }}>Please don't close this window...</p>
            </div>
          )}

          {step === 'success' && (
            <div style={{ padding: '60px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
                 style={{ color: '#34a853', marginBottom: '24px' }}
               >
                 <CheckCircle2 size={80} strokeWidth={1.5} />
               </motion.div>
               <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: 0 }}>Payment Successful!</h3>
               <p style={{ fontSize: '1rem', color: '#6B7280', marginTop: '12px' }}>Your subscription to <strong>{plan.name}</strong> is now active.</p>
               <div style={{ marginTop: '32px', width: '100%', padding: '20px', background: '#F0FDF4', borderRadius: '20px', border: '1px solid #BBF7D0' }}>
                 <p style={{ fontSize: '0.88rem', color: '#166534', fontWeight: 600 }}>Welcome to the Elite Tier!</p>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
