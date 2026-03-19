import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload, Shield, Zap, Download, CheckCircle, ArrowRight,
  HardDrive, Lock, Globe, Users, FolderOpen, Share2,
  Cloud, Activity, RefreshCw, Database, Server, Cpu, ChevronRight
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
      <Link to="/how-it-works" style={{ textDecoration: 'none', color: '#1a73e8', fontWeight: 600, fontSize: '0.95rem' }}>How it works</Link>
      <Link to="/pricing" style={{ textDecoration: 'none', color: '#5f6368', fontWeight: 500, fontSize: '0.95rem' }}>Pricing</Link>
      <Link to="/security" style={{ textDecoration: 'none', color: '#5f6368', fontWeight: 500, fontSize: '0.95rem' }}>Security</Link>
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
        {[['/', 'Home'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'], ['/security', 'Security'], ['/privacy', 'Privacy'], ['/terms', 'Terms']].map(([to, label]) => (
          <Link key={label} to={to} style={{ textDecoration: 'none', color: '#5f6368', fontSize: '0.88rem', fontWeight: 500 }}>{label}</Link>
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: '#80868b' }}>© 2026 CloudVault Inc.</p>
    </div>
  </footer>
);

const HowItWorks = () => {
  const steps = [
    {
      num: '01', icon: Upload, color: '#1a73e8', bg: '#e8f0fe',
      title: 'Upload your files',
      desc: 'Drag and drop files or entire folders — or upload from your device. CloudVault handles any file type, any size. Your files are encrypted the moment they leave your device, before they ever touch our servers.',
      details: ['Drag-and-drop upload interface', 'Folder upload support', 'Batch uploads up to 10,000 files', 'Auto-resume for interrupted uploads']
    },
    {
      num: '02', icon: Shield, color: '#34a853', bg: '#e6f4ea',
      title: 'Encrypted & distributed',
      desc: 'Every file is split into encrypted chunks using AES-256-GCM encryption. Chunks are fingerprinted, verified, and distributed across our global edge network for redundancy and speed.',
      details: ['AES-256-GCM client-side encryption', 'File sharding across 3+ regions', 'Cryptographic integrity checks', 'Zero-knowledge server storage']
    },
    {
      num: '03', icon: Users, color: '#ea4335', bg: '#fce8e6',
      title: 'Organize & collaborate',
      desc: 'Create folders, add files to starred collections, and share with teammates. Set granular permissions — viewer, commenter, or editor. Every share generates an auditable access log.',
      details: ['Nested folder organization', 'Starred & recent quick access', 'Viewer / Editor permissions', 'Real-time activity logs']
    },
    {
      num: '04', icon: Share2, color: '#a142f4', bg: '#f3e8fd',
      title: 'Share with confidence',
      desc: 'Share a file or folder via a secure link or invite specific people by email. Set link expiry, restrict downloading, and revoke access at any time from your dashboard.',
      details: ['Shareable links with expiry dates', 'Restrict download permissions', 'Email-based invitations', 'Revoke access instantly']
    },
    {
      num: '05', icon: Download, color: '#fbbc04', bg: '#fef7e0',
      title: 'Access from anywhere',
      desc: 'Your files are available across all your devices — browser, mobile, or API. Our global CDN serves your files from the nearest edge location, delivering sub-15ms latency worldwide.',
      details: ['Web browser access', 'Mobile-optimized interface', 'REST API access', '120+ global edge locations']
    },
    {
      num: '06', icon: Activity, color: '#1a73e8', bg: '#e8f0fe',
      title: 'Monitor & manage',
      desc: 'Get full visibility into your storage usage, file activity, and sharing history. Set storage alerts, view version history, and restore deleted files from Trash for up to 30 days.',
      details: ['Storage usage dashboard', 'File version history', '30-day trash recovery', 'Team activity audit logs']
    },
  ];

  const techFeatures = [
    { icon: Cpu, label: 'Edge Computing', desc: 'Files processed at 120+ edge locations worldwide' },
    { icon: RefreshCw, label: 'Auto-Sync', desc: 'Real-time synchronization across all your devices' },
    { icon: Database, label: '3x Redundancy', desc: 'Data replicated across 3 independent availability zones' },
    { icon: Server, label: '99.99% Uptime', desc: 'SLA-backed uptime guarantee with automatic failover' },
    { icon: Zap, label: '<15ms Latency', desc: 'Sub-15ms global file delivery via Supabase CDN' },
    { icon: Lock, label: 'Zero-Knowledge', desc: 'We cannot see your files — only you hold the keys' },
  ];

  return (
    <div style={{ background: '#fff', fontFamily: "'Google Sans', 'Roboto', system-ui, sans-serif", color: '#202124' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)', padding: '100px 6% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #dadce0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>How It Works</motion.p>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#202124', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
              Secure storage made <span style={{ color: '#1a73e8' }}>effortlessly simple</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.2rem', color: '#5f6368', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px' }}>
              From upload to access, every step of the CloudVault experience is designed around privacy, speed, and simplicity.
            </motion.p>
            <motion.div variants={fadeUp}>
              <SignUpButton mode="modal">
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1a73e8', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(26,115,232,0.3)' }}>
                  Try it free <ArrowRight size={18} />
                </button>
              </SignUpButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '80px 6% 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {steps.map((step, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
              <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: '80px', alignItems: 'center', padding: '80px 0', borderBottom: i < steps.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                {/* Text side */}
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#80868b', letterSpacing: '1px' }}>STEP {step.num}</span>
                    <div style={{ flex: 1, height: '1px', background: '#e8eaed' }} />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#202124', lineHeight: 1.2, marginBottom: '18px', letterSpacing: '-0.5px' }}>{step.title}</h2>
                  <p style={{ fontSize: '1.05rem', color: '#5f6368', lineHeight: 1.8, marginBottom: '28px' }}>{step.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {step.details.map((d, di) => (
                      <div key={di} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={17} color={step.color} />
                        <span style={{ fontSize: '0.92rem', color: '#3c4043', fontWeight: 500 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Visual side */}
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{ background: `linear-gradient(135deg, ${step.bg}, #fff)`, borderRadius: '28px', padding: '60px', border: '1px solid #e8eaed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '28px', background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 32px ${step.color}22`, marginBottom: '24px', border: `1px solid ${step.color}22` }}>
                      <step.icon size={52} color={step.color} strokeWidth={1.5} />
                    </div>
                    <div style={{ fontSize: '4rem', fontWeight: 800, color: step.color, opacity: 0.15, lineHeight: 1, letterSpacing: '-2px' }}>{step.num}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Features Grid */}
      <section style={{ background: '#f8faff', borderTop: '1px solid #e8eaed', padding: '100px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Under the Hood</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Infrastructure built for scale</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {techFeatures.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{ padding: '32px', borderRadius: '20px', border: '1px solid #e8eaed', background: '#fff', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <f.icon size={24} color="#1a73e8" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#202124', marginBottom: '10px' }}>{f.label}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#5f6368', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Common questions</h2>
          </motion.div>
          {[
            { q: 'Is CloudVault really free?', a: 'Yes — 15 GB of storage is completely free with no credit card required. You can upgrade to Pro or Business at any time for more storage and features.' },
            { q: 'What file types can I upload?', a: 'CloudVault supports every file type — documents, images, videos, ZIP archives, code files, and more. Individual file size limit is 5 GB on the free plan and 50 GB on Pro+.' },
            { q: 'Can I access my files offline?', a: 'Files can be downloaded to any device for offline access. Our mobile apps (coming soon) will include native offline sync support.' },
            { q: 'How is my data encrypted?', a: 'Files are encrypted using AES-256-GCM before upload. The encryption keys are derived from your account credentials and are never stored on our servers.' },
            { q: 'Can I share files with people who don\'t have an account?', a: 'Yes. Generate a shareable link for any file or folder. Recipients can view or download based on the permissions you set — no account required to receive a shared link.' },
            { q: 'What happens if I exceed my storage limit?', a: 'You\'ll receive an email warning at 90% usage. Once you hit the limit, uploads are paused. Existing files remain accessible. Simply upgrade your plan to continue uploading.' },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ padding: '28px 0', borderBottom: i < 5 ? '1px solid #f0f2f5' : 'none' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#202124', marginBottom: '12px' }}>{item.q}</h3>
                <p style={{ fontSize: '0.95rem', color: '#5f6368', lineHeight: 1.7 }}>{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#202124', marginBottom: '20px', letterSpacing: '-0.5px' }}>Ready to get started?</h2>
            <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '40px', lineHeight: 1.7 }}>15 GB free. No credit card. No commitment.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <SignUpButton mode="modal">
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1a73e8', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(26,115,232,0.3)' }}>
                  Create free account <ArrowRight size={18} />
                </button>
              </SignUpButton>
              <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid #dadce0', color: '#3c4043', background: '#fff', padding: '14px 28px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                View pricing <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
