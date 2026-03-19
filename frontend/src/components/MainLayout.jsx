import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardDrive, Twitter, Github, Linkedin } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const MainLayout = ({ children }) => {
  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Universal Navbar */}
      <nav style={{ 
        height: '80px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 8%',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '1px solid var(--border)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
          <div style={{ width: '45px', height: '45px', background: 'var(--primary)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HardDrive color="white" size={26} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '1.7rem', fontWeight: '900', letterSpacing: '-1.5px', color: 'var(--text-primary)' }}>CloudVault</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Link to="/how-it-works" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/security" className="nav-link">Security</Link>
          
          <SignedOut>
            <SignInButton mode="modal">
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
                <button className="btn-premium btn-primary-filled" style={{ padding: '12px 30px', borderRadius: '16px', border: 'none', fontSize: '1rem', fontWeight: '700', color: 'white' }}>Get Started</button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <Link to="/drive" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '1rem' }}>Open Vault</Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }} />
          </SignedIn>
        </div>
      </nav>

      {/* Page Content */}
      <main style={{ flex: 1, paddingTop: '80px' }}>
        {children}
      </main>

      {/* Universal Footer */}
      <footer style={{ padding: '100px 8% 60px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '80px', marginBottom: '100px' }}>
            <div style={{ flex: '1.5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <HardDrive color="white" size={24} />
                    </div>
                    <span style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1.5px', color: 'var(--text-primary)' }}>CloudVault</span>
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '400px' }}>
                    The world's most secure and beautiful storage platform. Empowering everyone to control their digital destiny.
                </p>
            </div>
            
            <div style={{ flex: '1', display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <div>
                    <h4 style={{ fontWeight: '800', marginBottom: '25px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Platform</h4>
                    <Link to="/how-it-works" className="footer-link">How it works</Link>
                    <Link to="/pricing" className="footer-link">Pricing</Link>
                    <Link to="/security" className="footer-link">Security</Link>
                </div>
                <div>
                    <h4 style={{ fontWeight: '800', marginBottom: '25px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Resources</h4>
                    <Link to="/docs" className="footer-link">Documentation</Link>
                    <Link to="/api-reference" className="footer-link">API Reference</Link>
                    <Link to="/community" className="footer-link">Community</Link>
                </div>
                <div>
                    <h4 style={{ fontWeight: '800', marginBottom: '25px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Legal</h4>
                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                    <Link to="/terms" className="footer-link">Terms of Service</Link>
                    <Link to="/cookies" className="footer-link">Cookies</Link>
                </div>
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>© 2026 CloudVault Inc. Clean White Vision.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div className="social-icon"><Twitter size={20} /></div>
                <div className="social-icon"><Github size={20} /></div>
                <div className="social-icon"><Linkedin size={20} /></div>
            </div>
        </div>

        <style>{`
            .nav-link, .footer-link {
                text-decoration: none;
                color: var(--text-secondary);
                transition: 0.3s;
                display: block;
                margin-bottom: 12px;
                font-weight: 500;
            }
            .nav-link:hover, .footer-link:hover {
                color: var(--primary);
            }
            .nav-link { display: inline-block; margin-bottom: 0; margin-right: 0; }
            .social-icon {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background: rgba(0,0,0,0.03);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: 0.3s;
                color: var(--text-secondary);
            }
            .social-icon:hover {
                background: var(--primary);
                color: white;
                transform: translateY(-5px);
            }
        `}</style>
      </footer>
    </div>
  );
};

export default MainLayout;
