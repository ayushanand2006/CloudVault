import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HardDrive, Twitter, Github, Linkedin, Home, Zap, Shield, CreditCard, Menu, X, Rocket, LayoutGrid, User, LogOut } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';

const MainLayout = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route-based UI states
  const isAccountPath = location.pathname.startsWith('/account');
  const isAppRoute = isAccountPath || location.pathname.startsWith('/drive');
  const hideGlobalHeader = isAppRoute;
  const hideBottomNav = ['/login', '/register'].some(path => location.pathname.startsWith(path));

  // Handle Account Search Params for sub-navigation
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'overview';

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Universal Floating Navbar */}
      {!hideGlobalHeader && (
        <nav style={{ 
        height: isScrolled ? '70px' : '85px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isScrolled ? '0 30px' : '0 8%',
        background: isScrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(30px) saturate(180%)' : 'none',
        position: 'fixed',
        top: isScrolled ? '20px' : '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isScrolled ? 'calc(100% - 40px)' : '100%',
        maxWidth: isScrolled ? '1200px' : '100%',
        zIndex: 1000,
        borderRadius: isScrolled ? '22px' : '0',
        border: isScrolled ? '1px solid rgba(255, 255, 255, 0.45)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.45)' : '1px solid var(--border)',
        boxShadow: isScrolled ? '0 12px 40px -12px rgba(0,0,0,0.12), 0 4px 12px -4px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }} className={`universal-nav ${isScrolled ? 'floating-nav' : ''}`}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }} className="nav-branding">
          <div style={{ width: isScrolled ? '42px' : '48px', height: isScrolled ? '42px' : '48px', background: 'var(--primary)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isScrolled ? '0 4px 12px var(--primary-glow)' : 'none', transition: 'all 0.5s' }}>
              <HardDrive color="white" size={isScrolled ? 24 : 28} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: isScrolled ? '1.6rem' : '1.8rem', fontWeight: '850', letterSpacing: '-1.2px', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif", transition: 'all 0.5s' }} className="nav-title">CloudVault</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="nav-links">
          <Link to="/how-it-works" className={`nav-link-capsule ${location.pathname === '/how-it-works' ? 'active' : ''}`}>Features</Link>
          <Link to="/pricing" className={`nav-link-capsule ${location.pathname === '/pricing' ? 'active' : ''}`}>Pricing</Link>
          <Link to="/security" className={`nav-link-capsule ${location.pathname === '/security' ? 'active' : ''}`}>Security</Link>
          
          <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 10px' }} className="nav-divider" />

          <SignedOut>
            <SignInButton mode="modal">
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', padding: '10px 18px', borderRadius: '14px', transition: '0.2s' }} className="nav-signin-btn">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
                <button className="nav-cta-premium" style={{ background: 'var(--primary)', padding: isScrolled ? '10px 24px' : '12px 28px', borderRadius: '14px', border: 'none', fontSize: '0.95rem', fontWeight: '700', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px var(--primary-glow)', transition: '0.3s' }}>Get Started</button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <Link to="/drive" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '750', fontSize: '0.95rem', marginRight: '15px' }} className="nav-open-vault">Open Vault</Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: isScrolled ? 'w-9 h-9' : 'w-10 h-10' } }} />
          </SignedIn>
        </div>
      </nav>
      )}

      {/* Page Content */}
      <main style={{ 
        flex: 1, 
        paddingTop: hideGlobalHeader ? '0' : (isScrolled ? '110px' : '85px'), 
        transition: 'padding-top 0.5s' 
      }} className="main-viewport">
        {children}
      </main>

      {/* Global Mobile Bottom Navigation */}
      {!hideBottomNav && (
        <nav className="global-bottom-nav">
          {isAccountPath ? (
            <>
              <Link to="/account?tab=overview" className={`bottom-nav-link ${activeTab === 'overview' ? 'active' : ''}`}>
                <LayoutGrid size={22} />
                <span>Overview</span>
              </Link>
              <Link to="/account?tab=billing" className={`bottom-nav-link ${activeTab === 'billing' ? 'active' : ''}`}>
                <CreditCard size={22} />
                <span>Billing</span>
              </Link>
              <Link to="/account?tab=security" className={`bottom-nav-link ${activeTab === 'security' ? 'active' : ''}`}>
                <Shield size={22} />
                <span>Security</span>
              </Link>
              <Link to="/account?tab=profile" className={`bottom-nav-link ${activeTab === 'profile' ? 'active' : ''}`}>
                <User size={22} />
                <span>Profile</span>
              </Link>
              <Link to="/drive" className="bottom-nav-link exit">
                <LogOut size={22} />
                <span>Vault</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={`bottom-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                <Home size={22} />
                <span>Home</span>
              </Link>
              <Link to="/how-it-works" className={`bottom-nav-link ${location.pathname === '/how-it-works' ? 'active' : ''}`}>
                <Zap size={22} />
                <span>Features</span>
              </Link>
              <Link to="/pricing" className={`bottom-nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>
                <CreditCard size={22} />
                <span>Pricing</span>
              </Link>
              <Link to="/security" className={`bottom-nav-link ${location.pathname === '/security' ? 'active' : ''}`}>
                <Shield size={22} />
                <span>Security</span>
              </Link>
              {isLoaded && !userId ? (
                <SignInButton mode="modal">
                  <div className="bottom-nav-link action">
                    <Rocket size={22} />
                    <span>Join</span>
                  </div>
                </SignInButton>
              ) : (
                <Link to="/drive" className={`bottom-nav-link action ${location.pathname === '/drive' ? 'active' : ''}`}>
                  <HardDrive size={22} />
                  <span>Vault</span>
                </Link>
              )}
            </>
          )}
        </nav>
      )}

      {/* Universal Footer */}
      <footer style={{ padding: '100px 8% 60px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '80px', marginBottom: '100px' }}>
            <div style={{ flex: '1.5' }} className="footer-logo-section">
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
            
            <div style={{ flex: '1', display: 'flex', justifyContent: 'space-around', width: '100%' }} className="footer-links-container">
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
            .nav-link-capsule {
                text-decoration: none;
                color: var(--text-secondary);
                transition: all 0.3s ease;
                font-weight: 600;
                font-size: 0.95rem;
                padding: 10px 18px;
                border-radius: 14px;
                font-family: 'Inter', sans-serif;
            }
            .nav-link-capsule:hover {
                background: rgba(26, 115, 232, 0.08);
                color: var(--primary);
            }
            .nav-link-capsule.active {
                background: rgba(26, 115, 232, 0.12);
                color: var(--primary);
            }
            .nav-signin-btn:hover {
                background: rgba(0,0,0,0.04) !important;
            }
            .nav-cta-premium:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px var(--primary-glow) !important;
                filter: brightness(1.1);
            }
            .footer-link {
                text-decoration: none;
                color: var(--text-secondary);
                transition: 0.3s;
                display: block;
                margin-bottom: 12px;
                font-weight: 500;
            }
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

            @media (max-width: 1024px) {
                .nav-divider { display: none !important; }
                .nav-link-capsule { display: none !important; }
                .nav-signin-btn { display: none !important; }
                .nav-cta-premium { padding: 9px 18px !important; font-size: 0.85rem !important; }
                footer div[style*="justifyContent: 'space-between'"] { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 40px !important; }
                .footer-links-container { flex-direction: column !important; align-items: center !important; gap: 40px !important; }
                .footer-logo-section { display: flex; flex-direction: column; align-items: center; text-align: center !important; }
            }
            
            @media (max-width: 768px) {
                .nav-title { display: none !important; }
                .nav-open-vault { font-size: 0.9rem !important; }
                
                /* Global Bottom Nav Styles */
                .global-bottom-nav {
                    display: flex !important;
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                    height: 70px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(25px) saturate(160%);
                    -webkit-backdrop-filter: blur(25px) saturate(160%);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 20px;
                    z-index: 2000;
                    align-items: center;
                    justify-content: space-around;
                    padding: 0 5px 5px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .global-bottom-nav:hover {
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                    transform: translateY(-2px);
                }
                .bottom-nav-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    color: #5f6368;
                    text-decoration: none;
                    font-size: 0.65rem;
                    font-weight: 500;
                    transition: 0.2s;
                }
                .bottom-nav-link span { opacity: 0.8; }
                .bottom-nav-link:active { transform: scale(0.9); }
                .bottom-nav-link.active { color: var(--primary); }
                .bottom-nav-link.active span { opacity: 1; font-weight: 750; }
                .bottom-nav-link.action {
                    color: var(--primary);
                    font-weight: 700;
                }
                .bottom-nav-link.exit { color: #d93025; font-weight: 700; }
            }
            .global-bottom-nav { display: none; }
        `}</style>
      </footer>
    </div>
  );
};

export default MainLayout;
