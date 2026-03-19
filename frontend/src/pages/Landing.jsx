import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HardDrive, Shield, Zap, Users, ChevronRight,
  ArrowRight, CheckCircle, Globe, Lock, Star,
  Folder, Share2, Cloud, Twitter, Github, Linkedin
} from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* ── Reusable section header ── */
const SectionHeader = ({ eyebrow, title, subtitle, center = true }) => (
  <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '80px' }} className="section-header">
    {eyebrow && (
      <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>
        {eyebrow}
      </p>
    )}
    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', fontFamily: "'Outfit', sans-serif" }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: '1.2rem', color: '#5f6368', maxWidth: center ? '720px' : '520px', margin: center ? '0 auto' : '0', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield, color: '#1a73e8', bg: '#e8f0fe',
      title: 'Military-grade encryption',
      desc: 'AES-256 encryption at rest and TLS 1.3 in transit. Your data is always yours.'
    },
    {
      icon: Zap, color: '#fbbc04', bg: '#fef7e0',
      title: 'Lightning-fast access',
      desc: 'Global CDN with sub-15ms latency. Access your files from anywhere, instantly.'
    },
    {
      icon: Users, color: '#34a853', bg: '#e6f4ea',
      title: 'Real-time collaboration',
      desc: 'Invite team members, set permissions, and collaborate without friction.'
    },
    {
      icon: Globe, color: '#ea4335', bg: '#fce8e6',
      title: '120+ Edge locations',
      desc: 'Distributed infrastructure ensures 99.99% uptime and zero data loss.'
    },
    {
      icon: Lock, color: '#a142f4', bg: '#f3e8fd',
      title: 'Zero-knowledge privacy',
      desc: 'Even we can\'t see your files. Pure privacy by design, always.'
    },
    {
      icon: Share2, color: '#1a73e8', bg: '#e8f0fe',
      title: 'Smart sharing controls',
      desc: 'Share with a link or specific people. Set viewer or editor permissions instantly.'
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      storage: '15 GB',
      color: '#1a73e8',
      features: ['15 GB storage', 'Basic file sharing', 'Web & mobile access', 'Standard support'],
      cta: 'Get started for free',
      isPrimary: false
    },
    {
      name: 'Pro',
      price: '₹149',
      period: '/month',
      storage: '100 GB',
      color: '#1a73e8',
      features: ['100 GB storage', 'Advanced sharing & permissions', 'Priority CDN access', 'Priority support', 'Version history', 'Team workspaces'],
      cta: 'Start free trial',
      isPrimary: true
    },
    {
      name: 'Business',
      price: '₹399',
      period: '/month',
      storage: '2 TB',
      color: '#1a73e8',
      features: ['2 TB storage', 'Unlimited team members', 'Admin controls & audit logs', 'Enterprise support', '99.99% SLA', 'Custom domain'],
      cta: 'Contact sales',
      isPrimary: false
    },
  ];

  return (
    <div style={{ background: '#fff', color: '#202124', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center', background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle dot pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #dadce0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />

        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(26,115,232,0.07), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(52,168,83,0.06), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} className="hero-content">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#e8f0fe', color: '#1a73e8', fontWeight: 600,
                fontSize: '0.85rem', padding: '8px 20px', borderRadius: '30px',
                marginBottom: '32px', letterSpacing: '0.2px', fontFamily: "'Inter', sans-serif"
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a73e8', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Over 15 GB of secure free storage
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeUp} 
              style={{ 
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', 
                fontWeight: 800, 
                color: '#202124', 
                lineHeight: 1.2, 
                letterSpacing: '-0.02em', 
                marginBottom: '40px', 
                fontFamily: "'Outfit', sans-serif" 
              }}
            >
              Store, access, and share <span style={{ color: '#1a73e8' }}>your files</span> safely
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} style={{ fontSize: '1.25rem', color: '#5f6368', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 56px', fontFamily: "'Inter', sans-serif" }} className="hero-subtitle">
              Get the secure cloud storage you need to collaborate and store your most important files. Protected by Google-grade security protocols.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }} className="hero-ctas">
              <SignUpButton mode="modal">
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  background: '#1a73e8', color: '#fff', border: 'none',
                  padding: '16px 40px', borderRadius: '32px',
                  fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 12px rgba(26,115,232,0.25)',
                  fontFamily: "'Inter', sans-serif"
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,115,232,0.35)'; e.currentTarget.style.background = '#1765cc'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,115,232,0.25)'; e.currentTarget.style.background = '#1a73e8'; }}
                >
                  Start for free <ArrowRight size={20} />
                </button>
              </SignUpButton>
              <Link to="/how-it-works" style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                border: '1.5px solid #dadce0', color: '#3c4043', background: '#fff',
                padding: '16px 40px', borderRadius: '32px',
                fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', textDecoration: 'none',
                fontFamily: "'Inter', sans-serif"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#bdc1c6'; e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#dadce0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Learn more <ChevronRight size={20} />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                '✓ No credit card required',
                '✓ 15 GB free storage',
                '✓ Cancel anytime',
              ].map((t, i) => (
                <span key={i} style={{ fontSize: '0.88rem', color: '#80868b', fontWeight: 500 }}>{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: '1100px', margin: '72px auto 0', padding: '0 5%', position: 'relative', zIndex: 1 }}
          className="mockup-container"
        >
          {/* Drive UI Mockup */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            border: '1px solid #dadce0',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
          }}>
            {/* Mockup browser bar */}
            <div style={{ height: '44px', background: '#f8f9fa', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 18px', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#ea4335','#fbbc04','#34a853'].map((c, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, height: '26px', background: '#fff', borderRadius: '14px', margin: '0 18px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: '0.75rem', color: '#80868b' }}>
                cloudvault.app/drive
              </div>
            </div>
            {/* Mockup content */}
            <div style={{ display: 'flex', height: '460px' }}>
              {/* Sidebar */}
              <div style={{ width: '200px', background: '#f8f9fa', borderRight: '1px solid #e0e0e0', padding: '16px 0', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4285f4, #1a73e8)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HardDrive size={16} color="#fff" />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#202124' }}>CloudVault</span>
                </div>
                <div style={{ margin: '8px 8px 16px', background: '#fff', border: '1px solid #dadce0', borderRadius: '18px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#202124', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: '1rem' }}>+</span> New
                </div>
                {[
                  { icon: HardDrive, label: 'My Drive', active: true },
                  { icon: Users, label: 'Shared with me' },
                  { icon: Star, label: 'Starred' },
                  { icon: Cloud, label: 'Storage' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 20px', borderRadius: '0 24px 24px 0', background: item.active ? '#c2e7ff' : 'transparent', marginRight: '12px', fontSize: '0.82rem', fontWeight: item.active ? 700 : 500, color: item.active ? '#001d35' : '#444746', cursor: 'pointer', marginBottom: '2px' }}>
                    <item.icon size={16} />
                    {item.label}
                  </div>
                ))}
              </div>
              {/* Main area */}
              <div style={{ flex: 1, padding: '20px 24px', overflow: 'hidden' }}>
                {/* Search bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f1f3f4', borderRadius: '24px', padding: '10px 20px', marginBottom: '24px', maxWidth: '600px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: '0.88rem', color: '#5f6368' }}>Search in Drive</span>
                </div>
                {/* Folders row */}
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#80868b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Folders</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
                  {['Documents', 'Photos', 'Projects', 'Shared'].map((name, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#f8f9fa', borderRadius: '10px', border: '1px solid transparent', cursor: 'pointer', transition: '0.2s', fontSize: '0.8rem', fontWeight: 500, color: '#202124' }}>
                      <Folder size={16} color="#5f6368" />
                      {name}
                    </div>
                  ))}
                </div>
                {/* Files row */}
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#80868b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Files</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {[
                    { name: 'Resume.pdf', color: '#4285f4', bg: '#e8f0fe' },
                    { name: 'Notes.docx', color: '#34a853', bg: '#e6f4ea' },
                    { name: 'Budget.xlsx', color: '#0f9d58', bg: '#e6f4ea' },
                    { name: 'Poster.png', color: '#ea4335', bg: '#fce8e6' },
                  ].map((file, i) => (
                    <div key={i} style={{ borderRadius: '10px', border: '1px solid #e0e0e0', overflow: 'hidden', cursor: 'pointer' }}>
                      <div style={{ height: '90px', background: file.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={file.color} strokeWidth="1.5"/><polyline points="14 2 14 8 20 8" stroke={file.color} strokeWidth="1.5"/></svg>
                      </div>
                      <div style={{ padding: '8px 10px', fontSize: '0.75rem', fontWeight: 500, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section style={{ padding: '56px 5%', borderTop: '1px solid #f0f2f5', borderBottom: '1px solid #f0f2f5', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#80868b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '36px' }}>
            Trusted by teams at
          </p>
          <div style={{ display: 'flex', gap: '60px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Acme Corp', 'Stark Industries', 'Global Dynamics', 'Wayne Ent.', 'Initech'].map((name, i) => (
              <span key={i} style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dadce0', letterSpacing: '-0.5px' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '120px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <SectionHeader
              eyebrow="Why CloudVault"
              title="Everything you need to store, share, and collaborate"
              subtitle="Built from the ground up with security, speed, and simplicity as first-class features."
            />
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{
                  padding: '36px', borderRadius: '20px',
                  border: '1px solid #e8eaed', background: '#fff',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#dadce0'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#e8eaed'; }}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <f.icon size={26} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#202124', marginBottom: '16px', letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>{f.title}</h3>
                  <p style={{ fontSize: '1rem', color: '#5f6368', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT 1 ── */}
      <section style={{ padding: '100px 6%', background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <SectionHeader
              eyebrow="Security First"
              title="Your data protected at every layer"
              subtitle="From the moment you upload, your files are encrypted. AES-256 at rest, TLS 1.3 in transit — always."
              center={false}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'End-to-end encryption on all files',
                'Advanced identity management',
                'Zero-knowledge architecture',
                'SOC2-ready infrastructure',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <CheckCircle size={20} color="#34a853" />
                  <span style={{ fontSize: '0.95rem', color: '#3c4043', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            <SignUpButton mode="modal">
              <button style={{ marginTop: '36px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1a73e8', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: '24px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(26,115,232,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,115,232,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,115,232,0.3)'; }}
              >
                Start for free <ArrowRight size={16} />
              </button>
            </SignUpButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ background: 'linear-gradient(135deg, #e8f0fe, #fff)', borderRadius: '24px', padding: '48px', border: '1px solid #e0e0e0', boxShadow: '0 8px 40px rgba(26,115,232,0.08)' }}>
              {/* Security score visual */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={36} color="#34a853" />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#80868b', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Security Score</p>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#34a853', lineHeight: 1 }}>95/100</p>
                </div>
              </div>
              {[
                { label: 'Encryption Active', status: 'Enabled', ok: true },
                { label: 'Identity Verified', status: 'Secure', ok: true },
                { label: 'SSL Certificate', status: 'Valid', ok: true },
                { label: 'Backup Redundancy', status: '3x replicated', ok: true },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span style={{ fontSize: '0.88rem', color: '#5f6368', fontWeight: 500 }}>{row.label}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: row.ok ? '#34a853' : '#ea4335', background: row.ok ? '#e6f4ea' : '#fce8e6', padding: '4px 12px', borderRadius: '12px' }}>{row.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT 2 ── */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left: visual */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ background: 'linear-gradient(135deg, #fef7e0, #fff)', borderRadius: '24px', padding: '40px', border: '1px solid #e8eaed', boxShadow: '0 8px 40px rgba(251,188,4,0.08)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#80868b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Shared with you</p>
              {[
                { name: 'Q3 Report.pdf', by: 'Priya S.', time: '2h ago', color: '#4285f4', bg: '#e8f0fe' },
                { name: 'Design Assets.zip', by: 'Karan M.', time: '5h ago', color: '#34a853', bg: '#e6f4ea' },
                { name: 'Budget 2026.xlsx', by: 'You', time: 'Yesterday', color: '#0f9d58', bg: '#e6f4ea' },
              ].map((file, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '14px', background: '#fff', border: '1px solid #f0f2f5', marginBottom: i < 2 ? '10px' : '0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: file.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={file.color} strokeWidth="1.5"/><polyline points="14 2 14 8 20 8" stroke={file.color} strokeWidth="1.5"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '3px' }}>{file.name}</p>
                    <p style={{ fontSize: '0.76rem', color: '#80868b' }}>{file.by} · {file.time}</p>
                  </div>
                  <Share2 size={16} color="#80868b" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <SectionHeader
              eyebrow="Collaboration"
              title="Share files and folders with the right people"
              subtitle="Set viewer or editor permissions. Share via link or email. Revoke access anytime — you're always in control."
              center={false}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Granular viewer & editor permissions',
                'Secure link sharing with expiry',
                'Real-time activity logs',
                'Department-level team workspaces',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <CheckCircle size={20} color="#1a73e8" />
                  <span style={{ fontSize: '0.95rem', color: '#3c4043', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ padding: '80px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed', borderBottom: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { num: '120+', label: 'Edge locations worldwide' },
            { num: '<15ms', label: 'Average global latency' },
            { num: '99.99%', label: 'Uptime SLA guarantee' },
            { num: '0', label: 'Reported data breaches' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <p style={{ fontSize: '2.8rem', fontWeight: 800, color: '#1a73e8', lineHeight: 1, marginBottom: '10px', letterSpacing: '-1px' }}>{stat.num}</p>
              <p style={{ fontSize: '0.9rem', color: '#5f6368', fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '120px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <SectionHeader
              eyebrow="Simple pricing"
              title="Free to start, affordable to grow"
              subtitle="Choose the plan that fits your needs. Upgrade or downgrade anytime with no penalties."
            />
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}
          >
            {plans.map((plan, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{
                  border: plan.isPrimary ? '2px solid #1a73e8' : '1px solid #e8eaed',
                  borderRadius: '24px', padding: '40px',
                  background: plan.isPrimary ? 'linear-gradient(160deg, #f0f6ff, #fff)' : '#fff',
                  boxShadow: plan.isPrimary ? '0 12px 40px rgba(26,115,232,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                  height: '100%', display: 'flex', flexDirection: 'column',
                  position: 'relative',
                }}>
                  {plan.isPrimary && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#1a73e8', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '5px 18px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: plan.isPrimary ? '#1a73e8' : '#5f6368', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: "'Inter', sans-serif" }}>{plan.name}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#202124', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>{plan.price}</span>
                    <span style={{ fontSize: '1.1rem', color: '#80868b', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{plan.period}</span>
                  </div>
                  <p style={{ fontSize: '1rem', color: '#5f6368', marginBottom: '32px', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{plan.storage} storage</p>
                  <div style={{ width: '100%', height: '1px', background: '#f0f2f5', marginBottom: '28px' }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#3c4043', fontWeight: 500 }}>
                        <CheckCircle size={17} color="#34a853" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <SignUpButton mode="modal">
                    <button style={{
                      width: '100%', padding: '13px', borderRadius: '12px',
                      background: plan.isPrimary ? '#1a73e8' : 'transparent',
                      color: plan.isPrimary ? '#fff' : '#1a73e8',
                      border: plan.isPrimary ? 'none' : '1.5px solid #1a73e8',
                      fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.2s', fontFamily: 'inherit',
                      boxShadow: plan.isPrimary ? '0 2px 8px rgba(26,115,232,0.3)' : 'none',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
                    >
                      {plan.cta}
                    </button>
                  </SignUpButton>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '100px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed' }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #1a73e8, #4285f4)', borderRadius: '32px', padding: '80px 60px', textAlign: 'center', boxShadow: '0 24px 80px rgba(26,115,232,0.3)', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '24px', letterSpacing: '-0.03em', position: 'relative', fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>
            Ready to secure your files?
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '56px', lineHeight: 1.7, position: 'relative', fontFamily: "'Inter', sans-serif", maxWidth: '640px', margin: '0 auto 56px' }}>
            Join millions of users who trust CloudVault for their most important documents. Get started for free today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <SignUpButton mode="modal">
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#fff', color: '#1a73e8', border: 'none', padding: '16px 48px', borderRadius: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', fontFamily: "'Inter', sans-serif", boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'; e.currentTarget.style.background = '#fefefe'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; e.currentTarget.style.background = '#fff'; }}
              >
                Get started for free <ArrowRight size={20} />
              </button>
            </SignUpButton>
            <Link to="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', background: 'transparent', padding: '14px 32px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 600, transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '64px 6% 40px', background: '#fff', borderTop: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4285f4, #1a73e8)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HardDrive size={18} color="#fff" />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#202124', letterSpacing: '-0.3px' }}>CloudVault</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#5f6368', lineHeight: 1.7, maxWidth: '280px', marginBottom: '28px' }}>
                Secure cloud storage for teams and individuals. Built for the modern edge.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <div key={i} style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #e8eaed', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#80868b', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f8faff'; e.currentTarget.style.borderColor = '#1a73e8'; e.currentTarget.style.color = '#1a73e8'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = '#e8eaed'; e.currentTarget.style.color = '#80868b'; }}
                  ><Icon size={17} /></div>
                ))}
              </div>
            </div>
            {[
              { title: 'Product', links: [['Features', '/how-it-works'], ['Pricing', '/pricing'], ['Security', '/security'], ['Documentation', '/docs']] },
              { title: 'Company', links: [['About', '/'], ['Blog', '/'], ['Careers', '/'], ['Press', '/']] },
              { title: 'Legal', links: [['Privacy', '/privacy'], ['Terms', '/terms'], ['Cookies', '/cookies'], ['GDPR', '/']] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#202124', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.links.map(([label, to], li) => (
                    <Link key={li} to={to} style={{ fontSize: '0.9rem', color: '#5f6368', textDecoration: 'none', fontWeight: 500, transition: '0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#1a73e8'}
                      onMouseLeave={e => e.target.style.color = '#5f6368'}
                    >{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #f0f2f5', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '0.85rem', color: '#80868b' }}>© 2026 CloudVault Inc. All rights reserved.</p>
            <p style={{ fontSize: '0.85rem', color: '#80868b' }}>Made with ❤️ for secure storage</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        
        .nav-links { display: flex; gap: 32px; align-items: center; }
        
        @media (max-width: 1024px) {
          section { padding-left: 5% !important; padding-right: 5% !important; }
          .hero-content { max-width: 100% !important; }
          .mockup-container { display: none !important; }
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          div[style*="gridTemplateColumns: 'repeat(3"] { grid-template-columns: 1fr !important; max-width: 500px !important; margin: 0 auto !important; }
          div[style*="gridTemplateColumns: '2fr 1fr 1fr 1fr'"] { grid-template-columns: 1fr 1fr !important; }
        }

        @media (max-width: 768px) {
          nav { padding: 0 5% !important; }
          .nav-link-item { display: none !important; }
          .nav-signin-btn { display: none !important; }
          .nav-cta-btn { padding: 8px 18px !important; font-size: 0.85rem !important; }
          
          h1 { font-size: 2.5rem !important; margin-bottom: 24px !important; }
          .hero-subtitle { font-size: 1.1rem !important; margin-bottom: 40px !important; }
          .hero-ctas { flex-direction: column !important; width: 100% !important; }
          .hero-ctas > * { width: 100% !important; justify-content: center !important; }
          
          .section-header h2 { font-size: 2rem !important; }
          .section-header p { font-size: 1rem !important; }
          
          div[style*="gridTemplateColumns: 'repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          div[style*="gridTemplateColumns: '2fr 1fr 1fr 1fr'"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          
          footer { text-align: center; }
          footer div[style*="display: 'flex'"] { justify-content: center !important; }
          .footer-top { grid-template-columns: 1fr !important; text-align: center; }
          .footer-col { display: flex; flex-direction: column; align-items: center; }
        }
      `}</style>
    </div>
  );
};

export default Landing;
