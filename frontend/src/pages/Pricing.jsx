import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HardDrive, CheckCircle, ArrowRight, Zap, Shield,
  Users, Globe, Lock, Star, X, ChevronDown, ChevronUp
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
      <Link to="/pricing" style={{ textDecoration: 'none', color: '#1a73e8', fontWeight: 600, fontSize: '0.95rem' }}>Pricing</Link>
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
        {[['/', 'Home'], ['/how-it-works', 'How it works'], ['/pricing', 'Pricing'], ['/security', 'Security'], ['/privacy', 'Privacy']].map(([to, label]) => (
          <Link key={label} to={to} style={{ textDecoration: 'none', color: '#5f6368', fontSize: '0.88rem', fontWeight: 500 }}>{label}</Link>
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: '#80868b' }}>© 2026 CloudVault Inc.</p>
    </div>
  </footer>
);

const Pricing = () => {
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: 'Free',
      monthlyPrice: 0,
      annualPrice: 0,
      currency: '₹',
      storage: '15 GB',
      color: '#5f6368',
      accent: '#f1f3f4',
      isPrimary: false,
      isEnterprise: false,
      cta: 'Get started for free',
      features: [
        { label: '15 GB storage', included: true },
        { label: 'File upload up to 100 MB', included: true },
        { label: 'Basic sharing (view only)', included: true },
        { label: 'Web access', included: true },
        { label: 'Standard support', included: true },
        { label: 'Version history', included: false },
        { label: 'Team workspaces', included: false },
        { label: 'Advanced permissions', included: false },
        { label: 'Priority CDN', included: false },
        { label: 'Admin controls', included: false },
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 149,
      annualPrice: 99,
      currency: '₹',
      storage: '200 GB',
      color: '#1a73e8',
      accent: '#e8f0fe',
      isPrimary: true,
      isEnterprise: false,
      badge: 'Most Popular',
      cta: 'Start 14-day free trial',
      features: [
        { label: '200 GB storage', included: true },
        { label: 'File upload up to 5 GB', included: true },
        { label: 'Viewer & editor sharing', included: true },
        { label: 'Web & mobile access', included: true },
        { label: 'Priority support', included: true },
        { label: '30-day version history', included: true },
        { label: 'Team workspaces (up to 5)', included: true },
        { label: 'Advanced permissions', included: true },
        { label: 'Priority CDN', included: false },
        { label: 'Admin controls', included: false },
      ]
    },
    {
      name: 'Business',
      monthlyPrice: 399,
      annualPrice: 269,
      currency: '₹',
      storage: '2 TB',
      color: '#34a853',
      accent: '#e6f4ea',
      isPrimary: false,
      isEnterprise: false,
      cta: 'Start 14-day free trial',
      features: [
        { label: '2 TB shared storage', included: true },
        { label: 'File upload up to 50 GB', included: true },
        { label: 'Full sharing controls', included: true },
        { label: 'All platforms + API', included: true },
        { label: 'Dedicated support', included: true },
        { label: '90-day version history', included: true },
        { label: 'Unlimited team workspaces', included: true },
        { label: 'Advanced permissions', included: true },
        { label: 'Priority CDN (Global)', included: true },
        { label: 'Admin controls & audit logs', included: true },
      ]
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      currency: '₹',
      storage: 'Unlimited',
      color: '#a142f4',
      accent: '#f3e8fd',
      isPrimary: false,
      isEnterprise: true,
      cta: 'Contact sales',
      features: [
        { label: 'Unlimited storage', included: true },
        { label: 'Unlimited file size', included: true },
        { label: 'SSO & SAML integration', included: true },
        { label: 'Custom domain', included: true },
        { label: '24/7 dedicated support + SLA', included: true },
        { label: 'Unlimited version history', included: true },
        { label: 'Unlimited workspaces', included: true },
        { label: 'Custom permissions policies', included: true },
        { label: 'Dedicated infrastructure', included: true },
        { label: 'Full security audit access', included: true },
      ]
    },
  ];

  const comparisonFeatures = [
    { label: 'Storage', values: ['15 GB', '200 GB', '2 TB', 'Unlimited'] },
    { label: 'Max file size', values: ['100 MB', '5 GB', '50 GB', 'Unlimited'] },
    { label: 'Users', values: ['1', '1', 'Unlimited', 'Unlimited'] },
    { label: 'Workspaces', values: ['—', '5', 'Unlimited', 'Unlimited'] },
    { label: 'Version history', values: ['—', '30 days', '90 days', 'Unlimited'] },
    { label: 'API access', values: [false, false, true, true] },
    { label: 'Priority CDN', values: [false, false, true, true] },
    { label: 'Admin controls', values: [false, false, true, true] },
    { label: 'SSO / SAML', values: [false, false, false, true] },
    { label: 'Custom domain', values: [false, false, false, true] },
    { label: 'SLA guarantee', values: ['—', '99.9%', '99.99%', '99.999%'] },
    { label: 'Support', values: ['Standard', 'Priority', 'Dedicated', '24/7 + SLA'] },
  ];

  const faqs = [
    { q: 'Can I switch plans at any time?', a: 'Yes. You can upgrade or downgrade your plan at any time. When upgrading, the new features are available immediately and you\'re billed pro-rata for the remainder of the month. When downgrading, changes take effect at the end of your billing cycle.' },
    { q: 'Is there a free trial for paid plans?', a: 'Pro and Business plans come with a 14-day free trial. No credit card required to start. You\'ll only be charged after the trial ends if you choose to continue.' },
    { q: 'What happens to my files if I downgrade?', a: 'Your files stay safe. If your storage usage exceeds the new plan\'s limit after downgrading, your files remain accessible but new uploads are paused until usage is back within the limit.' },
    { q: 'How does annual billing work?', a: 'Annual billing gives you up to 33% off compared to monthly billing. You\'re charged once per year at the start of your billing cycle. You can cancel at any time and will retain access until the end of the annual period.' },
    { q: 'Do you offer non-profit or educational pricing?', a: 'Yes. CloudVault offers a 50% discount for verified non-profit organizations and educational institutions. Contact our sales team at sales@cloudvault.app to apply.' },
    { q: 'Is VAT or GST included in the pricing?', a: 'Prices shown exclude applicable taxes. GST will be added at checkout based on your location and business status. For Indian customers, 18% GST applies.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), UPI, net banking, and bank transfers for Enterprise plans. All payments are processed securely via Razorpay.' },
    { q: 'Can I get an invoice for my subscription?', a: 'Yes. Invoices are generated automatically every billing cycle and emailed to your account email. You can also download all past invoices from your account settings.' },
  ];

  const getPrice = (plan) => {
    if (plan.isEnterprise) return null;
    if (plan.monthlyPrice === 0) return 0;
    return billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  };

  return (
    <div style={{ background: '#fff', fontFamily: "'Google Sans', 'Roboto', system-ui, sans-serif", color: '#202124' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)', padding: '100px 6% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #dadce0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Pricing</motion.p>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#202124', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
              Simple, transparent <span style={{ color: '#1a73e8' }}>pricing</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '1.15rem', color: '#5f6368', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 40px' }}>
              Start free, scale when you\'re ready. No hidden fees. Cancel anytime.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', background: '#f1f3f4', borderRadius: '28px', padding: '4px', gap: '4px', marginBottom: '16px' }}>
              {['monthly', 'annual'].map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{ padding: '10px 24px', borderRadius: '24px', border: 'none', background: billing === b ? '#fff' : 'transparent', color: billing === b ? '#202124' : '#5f6368', fontWeight: billing === b ? 700 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: billing === b ? '0 1px 4px rgba(0,0,0,0.12)' : 'none', fontFamily: 'inherit' }}>
                  {b === 'monthly' ? 'Monthly' : 'Annually'}
                </button>
              ))}
            </motion.div>
            {billing === 'annual' && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <p style={{ fontSize: '0.85rem', color: '#34a853', fontWeight: 700 }}>💰 Save up to 33% with annual billing</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Plan Cards */}
      <section style={{ padding: '0 6% 100px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', alignItems: 'stretch' }}>
            {plans.map((plan, i) => {
              const price = getPrice(plan);
              return (
                <motion.div key={i} variants={fadeUp}>
                  <div style={{
                    border: plan.isPrimary ? '2px solid #1a73e8' : '1px solid #e8eaed',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    background: plan.isPrimary ? 'linear-gradient(160deg, #f0f6ff, #fff)' : '#fff',
                    boxShadow: plan.isPrimary ? '0 8px 40px rgba(26,115,232,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => !plan.isPrimary && (e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.08)')}
                    onMouseLeave={e => !plan.isPrimary && (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)')}
                  >
                    {plan.badge && (
                      <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#1a73e8', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '5px 16px', borderRadius: '20px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                        {plan.badge}
                      </div>
                    )}
                    <p style={{ fontSize: '0.78rem', fontWeight: 800, color: plan.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>{plan.name}</p>

                    {plan.isEnterprise ? (
                      <div style={{ marginBottom: '8px' }}>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: '#202124', lineHeight: 1 }}>Custom</p>
                        <p style={{ fontSize: '0.88rem', color: '#80868b', marginTop: '6px' }}>Talk to our sales team</p>
                      </div>
                    ) : (
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '0.9rem', color: '#202124', fontWeight: 600 }}>{plan.currency}</span>
                          <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#202124', lineHeight: 1 }}>{price}</span>
                          {price > 0 && <span style={{ fontSize: '0.88rem', color: '#80868b' }}>/mo</span>}
                        </div>
                        {billing === 'annual' && price > 0 && (
                          <p style={{ fontSize: '0.8rem', color: '#80868b', marginTop: '4px' }}>Billed ₹{plan.annualPrice * 12}/year</p>
                        )}
                      </div>
                    )}

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: plan.accent, padding: '6px 14px', borderRadius: '12px', marginBottom: '24px', marginTop: '4px' }}>
                      <HardDrive size={14} color={plan.color} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: plan.color }}>{plan.storage}</span>
                    </div>

                    <div style={{ width: '100%', height: '1px', background: '#f0f2f5', marginBottom: '24px' }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {plan.features.map((f, fi) => (
                        <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: f.included ? '#3c4043' : '#bdbdbd', fontWeight: f.included ? 500 : 400 }}>
                          {f.included
                            ? <CheckCircle size={16} color={plan.color} />
                            : <X size={16} color="#dadce0" />
                          }
                          {f.label}
                        </li>
                      ))}
                    </ul>

                    <SignUpButton mode="modal">
                      <button style={{
                        width: '100%', padding: '12px', borderRadius: '12px',
                        background: plan.isPrimary ? '#1a73e8' : 'transparent',
                        color: plan.isPrimary ? '#fff' : plan.color,
                        border: plan.isPrimary ? 'none' : `1.5px solid ${plan.color}`,
                        fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s', fontFamily: 'inherit',
                        boxShadow: plan.isPrimary ? '0 2px 8px rgba(26,115,232,0.25)' : 'none',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
                      >
                        {plan.cta}
                      </button>
                    </SignUpButton>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ textAlign: 'center', color: '#80868b', fontSize: '0.88rem', marginTop: '32px' }}>
            All plans include AES-256 encryption, 99.99% uptime SLA, and GDPR-compliant infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Included in all plans */}
      <section style={{ padding: '80px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Included everywhere</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Every plan includes these</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: Shield, label: 'AES-256 Encryption', desc: 'End-to-end encryption on all files', color: '#1a73e8', bg: '#e8f0fe' },
              { icon: Zap, label: 'Fast CDN Access', desc: 'Files served from the nearest edge', color: '#fbbc04', bg: '#fef7e0' },
              { icon: Globe, label: 'Global Availability', desc: '120+ edge locations worldwide', color: '#ea4335', bg: '#fce8e6' },
              { icon: Lock, label: '2-Factor Auth', desc: 'TOTP support on all accounts', color: '#34a853', bg: '#e6f4ea' },
              { icon: Users, label: 'Sharing Controls', desc: 'Share with fine-grained permissions', color: '#a142f4', bg: '#f3e8fd' },
              { icon: Star, label: 'Starred Files', desc: 'Pin your most important files', color: '#fbbc04', bg: '#fef7e0' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{ padding: '28px', borderRadius: '18px', border: '1px solid #e8eaed', background: '#fff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <f.icon size={22} color={f.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#202124', marginBottom: '6px' }}>{f.label}</p>
                    <p style={{ fontSize: '0.82rem', color: '#5f6368', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Compare plans</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Find the right plan for you</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ borderRadius: '20px', border: '1px solid #e8eaed', overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 120px)', background: '#f8faff', padding: '20px 24px', borderBottom: '1px solid #e8eaed', gap: '12px' }}>
                <div />
                {['Free', 'Pro', 'Business', 'Enterprise'].map((name, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: '0.88rem', fontWeight: 700, color: ['#5f6368', '#1a73e8', '#34a853', '#a142f4'][i] }}>{name}</div>
                ))}
              </div>
              {/* Rows */}
              {comparisonFeatures.map((row, ri) => (
                <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, 120px)', padding: '16px 24px', borderBottom: ri < comparisonFeatures.length - 1 ? '1px solid #f0f2f5' : 'none', gap: '12px', background: ri % 2 === 0 ? '#fff' : '#fafafa', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', color: '#3c4043', fontWeight: 500 }}>{row.label}</span>
                  {row.values.map((val, vi) => (
                    <div key={vi} style={{ textAlign: 'center' }}>
                      {typeof val === 'boolean'
                        ? val
                          ? <CheckCircle size={18} color="#34a853" style={{ margin: '0 auto' }} />
                          : <X size={16} color="#dadce0" style={{ margin: '0 auto' }} />
                        : <span style={{ fontSize: '0.82rem', fontWeight: 600, color: val === '—' ? '#bdbdbd' : '#202124' }}>{val}</span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 6%', background: '#f8faff', borderTop: '1px solid #e8eaed' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#202124', letterSpacing: '-0.5px' }}>Pricing questions answered</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div style={{ borderRadius: '16px', border: '1px solid #e8eaed', overflow: 'hidden', background: '#fff' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: '16px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#202124' }}>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} color="#5f6368" /> : <ChevronDown size={18} color="#5f6368" />}
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px' }}>
                      <p style={{ fontSize: '0.92rem', color: '#5f6368', lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ background: 'linear-gradient(135deg, #1a73e8, #4285f4)', borderRadius: '32px', padding: '80px 60px', textAlign: 'center', boxShadow: '0 24px 80px rgba(26,115,232,0.28)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: '16px', letterSpacing: '-0.5px', position: 'relative' }}>Start free today</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', lineHeight: 1.6, position: 'relative' }}>15 GB free. No credit card. Cancel anytime.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <SignUpButton mode="modal">
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#1a73e8', border: 'none', padding: '14px 36px', borderRadius: '28px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                  Get started for free <ArrowRight size={18} />
                </button>
              </SignUpButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
