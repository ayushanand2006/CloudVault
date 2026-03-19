import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Eye, CheckCircle, ArrowRight, HardDrive,
  Key, Server, AlertTriangle, FileCheck, Layers, Users,
  RefreshCw, Globe, Zap, Database
} from 'lucide-react';
import { SignUpButton } from '@clerk/clerk-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const Navbar = () => (
  <nav style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6%', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #4285f4, #1a73e8)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HardDrive color="white" size={22} strokeWidth={2} />
      </div>
      <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#202124', letterSpacing: '-0.3px' }}>CloudVault</span>
    </Link>
    <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
      <Link to="/how-it-works" style={{ textDecoration: 'none', color: '#5f6368', fontWeight: 500, fontSize: '0.95rem' }}>How it works</Link>
      <Link to="/pricing" style={{ textDecoration: 'none', color: '#5f6368', fontWeight: 500, fontSize: '0.95rem' }}>Pricing</Link>
      <Link to="/security" style={{ textDecoration: 'none', color: '#1a73e8', fontWeight: 600, fontSize: '0.95rem' }}>Security</Link>
      <SignUpButton mode="modal">
        <button style={{ background: '#1a73e8', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', padding: '9px 22px', borderRadius: '22px', fontFamily: 'inherit' }}>Get started</button>
      </SignUpButton>
    </div>
  </nav>
);

const Footer = () => (
  <footer style={{ borderTop: '1px solid #e8eaed', padding: '48px 6% 32px', background: '#fff' }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4285f4, #1a73e8)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HardDrive size={16} color="#fff" /></div>
        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#202124' }}>CloudVault</span>
      </Link>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {[['/', 'Home'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'], ['/security', 'Security'], ['/privacy', 'Privacy']].map(([to, label]) => (
          <Link key={label} to={to} style={{ textDecoration: 'none', color: '#5f6368', fontSize: '0.88rem', fontWeight: 500 }}>{label}</Link>
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: '#80868b' }}>© 2026 CloudVault Inc.</p>
    </div>
  </footer>
);

const Security = () => {
  const pillars = [
    {
      icon: Key, color: '#1a73e8', bg: '#e8f0fe',
      title: 'Zero-Knowledge Architecture',
      desc: 'CloudVault uses a zero-knowledge model — your encryption keys are derived from your credentials and never stored on our servers. Even our engineers cannot access your data.',
      points: ['Client-side key derivation (PBKDF2)', 'Keys never transmitted to servers', 'Encrypted locally before upload', 'Mathematically impossible server access']
    },
    {
      icon: Shield, color: '#34a853', bg: '#e6f4ea',
      title: 'AES-256-GCM Encryption',
      desc: 'Every file uploaded to CloudVault is encrypted using AES-256-GCM — the same standard trusted by governments, militaries, and enterprise security teams worldwide.',
      points: ['AES-256-GCM at rest', 'TLS 1.3 in transit', 'Unique key per file', 'Authenticated encryption with integrity check']
    },
    {
      icon: Layers, color: '#ea4335', bg: '#fce8e6',
      title: 'Multi-Layer Security Model',
      desc: 'Security at CloudVault is not a single lock — it\'s a layered defense. From two-factor authentication to IP-based anomaly detection, every layer enforces the principle of least privilege.',
      points: ['Two-factor authentication (TOTP)', 'Session token rotation', 'IP anomaly detection', 'Rate limiting on all APIs']
    },
    {
      icon: FileCheck, color: '#a142f4', bg: '#f3e8fd',
      title: 'Compliance & Auditing',
      desc: 'CloudVault\'s infrastructure is regularly audited and designed to meet the requirements of major compliance frameworks, helping your organization stay compliant without extra effort.',
      points: ['SOC 2 Type II ready', 'GDPR compliant architecture', 'HIPAA-eligible storage', 'Immutable access logs with timestamps']
    },
    {
      icon: RefreshCw, color: '#fbbc04', bg: '#fef7e0',
      title: 'Redundancy & Disaster Recovery',
      desc: 'Your files are never stored in a single location. CloudVault replicates every piece of data across three independent availability zones with automated failover.',
      points: ['3x geographic replication', '99.999% data durability', 'Automated failover (<1 second)', 'Point-in-time recovery']
    },
    {
      icon: AlertTriangle, color: '#ea4335', bg: '#fce8e6',
      title: 'Threat Detection & Response',
      desc: 'Our security monitoring runs 24/7, detecting anomalous access patterns, brute-force attempts, and suspicious sharing activity in real time — before they become incidents.',
      points: ['24/7 automated monitoring', 'Brute-force protection', 'Suspicious share detection', 'Automatic account lockout']
    },
  ];

  const complianceBadges = [
    { label: 'SOC 2 Type II', color: '#1a73e8' },
    { label: 'GDPR', color: '#34a853' },
    { label: 'HIPAA Eligible', color: '#ea4335' },
    { label: 'ISO 27001', color: '#a142f4' },
    { label: 'CCPA', color: '#fbbc04' },
    { label: 'PCI DSS', color: '#1a73e8' },
  ];

  return (
    <div style={{ background: '#fff', fontFamily: "'Google Sans', 'Roboto', system-ui, sans-serif", color: '#202124' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)', padding: '100px 6% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #dadce0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(26,115,232,0.06), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e6f4ea', padding: '8px 20px', borderRadius: '24px', marginBottom: '28px' }}>
              <Shield size={16} color="#34a853" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34a853' }}>Enterprise-grade security</span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 700, color: '#202124', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
              Security you can <span style={{ color: '#34a853' }}>actually trust</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.2rem', color: '#5f6368', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 48px' }}>
              We built CloudVault on the principle that privacy is a right, not a feature. Every architectural decision we make starts with security first.
            </motion.p>

            {/* Security score ring */}
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {[
                { num: '256-bit', label: 'Encryption' },
                { num: '99.999%', label: 'Data Durability' },
                { num: '24/7', label: 'Monitoring' },
                { num: '0', label: 'Breaches' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1a73e8', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px' }}>{s.num}</p>
                  <p style={{ fontSize: '0.82rem', color: '#80868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Compliance badges */}
      <section style={{ padding: '48px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed', borderBottom: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#80868b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '28px' }}>Compliance Frameworks</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {complianceBadges.map((b, i) => (
              <span key={i} style={{ padding: '8px 20px', borderRadius: '20px', border: `1.5px solid ${b.color}30`, background: `${b.color}10`, color: b.color, fontSize: '0.88rem', fontWeight: 700 }}>{b.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Security Pillars</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Six layers of protection, always on</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {pillars.map((p, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: '72px', alignItems: 'center', padding: '72px 0', borderBottom: i < pillars.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                  <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                      <p.icon size={28} color={p.color} />
                    </div>
                    <h3 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#202124', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.3px' }}>{p.title}</h3>
                    <p style={{ fontSize: '1.02rem', color: '#5f6368', lineHeight: 1.8, marginBottom: '24px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                      {p.points.map((pt, pi) => (
                        <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <CheckCircle size={17} color={p.color} />
                          <span style={{ fontSize: '0.92rem', color: '#3c4043', fontWeight: 500 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                    <div style={{ background: `linear-gradient(135deg, ${p.bg}, #fff)`, borderRadius: '28px', padding: '56px', border: '1px solid #e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '260px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '96px', height: '96px', borderRadius: '26px', background: p.bg, border: `1px solid ${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 8px 32px ${p.color}22` }}>
                          <p.icon size={52} color={p.color} strokeWidth={1.5} />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{p.title.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency section */}
      <section style={{ background: '#f8faff', borderTop: '1px solid #e8eaed', padding: '100px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34a853', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Transparency</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px', marginBottom: '20px' }}>We hold ourselves to a higher standard</h2>
            <p style={{ fontSize: '1.02rem', color: '#5f6368', lineHeight: 1.8, marginBottom: '32px' }}>
              Every quarter, we publish a transparency report detailing government data requests, security incidents, and uptime metrics. We commit to notifying users within 72 hours of any breach.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Quarterly transparency reports published', 'Bug bounty program open to researchers', '72-hour breach notification guarantee', 'Open-source encryption primitives'].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={17} color="#34a853" />
                  <span style={{ fontSize: '0.92rem', color: '#3c4043', fontWeight: 500 }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #f0f2f5', background: '#f8faff' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#80868b', textTransform: 'uppercase', letterSpacing: '1px' }}>Security Status — Live</p>
              </div>
              {[
                { label: 'Encryption Engine', status: 'Operational', ok: true },
                { label: 'CDN Edge Network', status: 'Operational', ok: true },
                { label: 'Auth Services', status: 'Operational', ok: true },
                { label: 'File Storage API', status: 'Operational', ok: true },
                { label: 'Monitoring Systems', status: 'Active', ok: true },
                { label: 'Backup Replication', status: '3x Active', ok: true },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', borderBottom: i < 5 ? '1px solid #f0f2f5' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34a853' }} />
                    <span style={{ fontSize: '0.88rem', color: '#3c4043', fontWeight: 500 }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34a853', background: '#e6f4ea', padding: '3px 12px', borderRadius: '12px' }}>{row.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <Shield size={36} color="#34a853" />
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#202124', marginBottom: '20px', letterSpacing: '-0.5px' }}>Your data is safe with us</h2>
            <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '44px', lineHeight: 1.7 }}>Start with 15 GB free. No credit card. Cancel anytime.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <SignUpButton mode="modal">
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1a73e8', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(26,115,232,0.3)' }}>
                  Create free account <ArrowRight size={18} />
                </button>
              </SignUpButton>
              <Link to="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid #dadce0', color: '#3c4043', background: '#fff', padding: '14px 28px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                How it works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
