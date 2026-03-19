import React, { useState, useEffect } from 'react';
import { useUser, useAuth, UserProfile } from '@clerk/clerk-react';
import { 
    ArrowLeft, HardDrive, Shield, Smartphone, Database, Lock, Folder, File, 
    Users, Star, Trash2, Check, X, Globe, Cloud, Zap, BarChart3, PieChart,
    ChevronRight, Settings, Bell, Activity, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, getStats } from '../services/api';

/* ─── Animated Counter ─── */
const AnimatedNumber = ({ value, duration = 1500, suffix = '' }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) { setDisplay(value); clearInterval(timer); }
            else setDisplay(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);
    return <span>{display}{suffix}</span>;
};

/* ─── Circular Progress (Modern) ─── */
const CircularProgress = ({ percentage, size = 140, strokeWidth = 12, color = '#1a73e8' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOffset(circumference - (percentage / 100) * circumference);
        }, 300);
        return () => clearTimeout(timer);
    }, [percentage, circumference]);

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 4px 12px ${color}30)` }}>
            <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f0f4f9" strokeWidth={strokeWidth} />
            <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
        </svg>
    );
};

/* ─── Stat Card (Modern) ─── */
const StatCard = ({ icon: Icon, label, value, color, gradient, delay = 0 }) => (
    <div className="acc-stat-card" style={{ animationDelay: `${delay}s` }}>
        <div className="acc-stat-icon" style={{ background: gradient || `${color}12` }}>
            <Icon size={22} color={gradient ? '#fff' : color} />
        </div>
        <div className="acc-stat-info">
            <p className="acc-stat-value"><AnimatedNumber value={value} /></p>
            <p className="acc-stat-label">{label}</p>
        </div>
    </div>
);

const Account = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const loadStats = async () => {
            try {
                const token = await getToken();
                setAuthToken(token);
                const res = await getStats();
                setStats(res.data);
            } catch (err) {
                console.error('Failed to load stats:', err);
                setStats({ totalBytes: 0, maxStorageBytes: 15*1024*1024*1024, usedPercentage: 0, fileCount: 0, folderCount: 0, sharedCount: 0, starredCount: 0, trashCount: 0, has2fa: false, plan: 'Free' });
            } finally { setLoading(false); }
        };
        loadStats();
    }, []);

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
        return (bytes / 1073741824).toFixed(2) + ' GB';
    };

    const computeSecurityScore = () => {
        if (!stats) return { score: 0, features: [] };
        let score = 40;
        const features = [];
        score += 25;
        features.push({ icon: Shield, label: 'Clerk Authentication', desc: 'End-to-end user identity management', active: true });
        if (stats.has2fa) { score += 20; }
        features.push({ icon: Smartphone, label: 'Two-Factor Auth', desc: 'Additional verification layer', active: stats.has2fa });
        score += 10;
        features.push({ icon: Database, label: 'Encrypted Storage', desc: 'AES-256 Supabase encryption', active: true });
        score += 5;
        features.push({ icon: Globe, label: 'SSL/TLS Encryption', desc: 'Secure data in transit', active: true });
        return { score: Math.min(score, 100), features };
    };

    const security = computeSecurityScore();
    const scoreLabel = security.score >= 80 ? 'Excellent' : security.score >= 50 ? 'Good' : 'Needs Work';
    const scoreColor = security.score >= 80 ? '#1e8e3e' : security.score >= 50 ? '#f9ab00' : '#d93025';

    return (
        <div className="acc-root">
            {/* ── Sticky Header ── */}
            <header className="acc-header">
                <div className="acc-header-left">
                    <button className="acc-back-btn" onClick={() => navigate('/drive')}>
                        <ArrowLeft size={18} />
                    </button>
                    <div className="acc-logo">
                        <div className="acc-logo-icon">
                            <Cloud size={20} color="#fff" />
                        </div>
                        <span>CloudVault</span>
                    </div>
                </div>
                <div className="acc-header-tabs">
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'security', label: 'Security', icon: Shield },
                        { id: 'profile', label: 'Profile', icon: Settings },
                    ].map(tab => (
                        <button key={tab.id}
                            className={`acc-tab ${activeSection === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(tab.id)}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="acc-header-user">
                    {user?.imageUrl && <img src={user.imageUrl} alt="" className="acc-header-avatar" />}
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="acc-main">

                {/* ═══ OVERVIEW TAB ═══ */}
                {activeSection === 'overview' && (
                    <div className="acc-section fade-slide-in">
                        {/* Hero Banner */}
                        <div className="acc-hero">
                            <div className="acc-hero-content">
                                <div className="acc-hero-avatar-wrapper">
                                    {user?.imageUrl ? (
                                        <img src={user.imageUrl} alt="" className="acc-hero-avatar" />
                                    ) : (
                                        <div className="acc-hero-avatar-placeholder">
                                            {user?.firstName?.[0] || 'U'}
                                        </div>
                                    )}
                                    <div className="acc-hero-online" />
                                </div>
                                <div>
                                    <h1 className="acc-hero-name">Welcome back, {user?.firstName || 'User'}</h1>
                                    <p className="acc-hero-email">{user?.emailAddresses?.[0]?.emailAddress}</p>
                                </div>
                            </div>
                            <div className="acc-hero-badge">
                                <Zap size={14} />
                                {stats?.plan || 'Free'} Plan
                            </div>
                        </div>

                        {/* Stats Grid */}
                        {stats && (
                            <div className="acc-stats-grid">
                                <StatCard icon={File} label="Files" value={stats.fileCount} color="#1a73e8" gradient="linear-gradient(135deg, #4285f4, #1a73e8)" delay={0} />
                                <StatCard icon={Folder} label="Folders" value={stats.folderCount} color="#fbbc04" gradient="linear-gradient(135deg, #fbbc04, #f9a825)" delay={0.08} />
                                <StatCard icon={Users} label="Shared" value={stats.sharedCount} color="#34a853" gradient="linear-gradient(135deg, #34a853, #1e8e3e)" delay={0.16} />
                                <StatCard icon={Star} label="Starred" value={stats.starredCount} color="#ea4335" gradient="linear-gradient(135deg, #ea4335, #d93025)" delay={0.24} />
                                <StatCard icon={Trash2} label="In Trash" value={stats.trashCount} color="#5f6368" gradient="linear-gradient(135deg, #80868b, #5f6368)" delay={0.32} />
                            </div>
                        )}

                        {/* Storage Card */}
                        {stats && (
                            <div className="acc-storage-card">
                                <div className="acc-storage-header">
                                    <div>
                                        <h3>Storage Usage</h3>
                                        <p className="acc-storage-subtitle">{formatBytes(stats.totalBytes)} of {formatBytes(stats.maxStorageBytes)} used</p>
                                    </div>
                                    <div className="acc-plan-badge" style={{ 
                                        background: stats.plan === 'Pro' ? 'linear-gradient(135deg, #4285f4, #1a73e8)' : '#f1f3f4',
                                        color: stats.plan === 'Pro' ? '#fff' : '#5f6368' 
                                    }}>
                                        {stats.plan || 'Free'}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="acc-storage-bar-bg">
                                    <div className="acc-storage-bar-fill" style={{
                                        width: `${Math.max(stats.usedPercentage, 1)}%`,
                                        background: stats.usedPercentage > 80 ? 'linear-gradient(90deg, #d93025, #ea4335)' : stats.usedPercentage > 50 ? 'linear-gradient(90deg, #f9ab00, #fbbc04)' : 'linear-gradient(90deg, #1a73e8, #4285f4)',
                                    }} />
                                </div>

                                <div className="acc-storage-breakdown">
                                    <div className="acc-storage-item">
                                        <div className="acc-storage-dot" style={{ background: '#1a73e8' }} />
                                        <span>Files</span>
                                        <strong>{stats.fileCount}</strong>
                                    </div>
                                    <div className="acc-storage-item">
                                        <div className="acc-storage-dot" style={{ background: '#fbbc04' }} />
                                        <span>Folders</span>
                                        <strong>{stats.folderCount}</strong>
                                    </div>
                                    <div className="acc-storage-item">
                                        <div className="acc-storage-dot" style={{ background: '#34a853' }} />
                                        <span>Available</span>
                                        <strong>{formatBytes(stats.maxStorageBytes - stats.totalBytes)}</strong>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ SECURITY TAB ═══ */}
                {activeSection === 'security' && (
                    <div className="acc-section fade-slide-in">
                        <div className="acc-security-grid">
                            {/* Score Card */}
                            <div className="acc-score-card">
                                <h3>Security Score</h3>
                                <div className="acc-score-visual">
                                    <div className="acc-score-ring">
                                        <CircularProgress percentage={security.score} color={scoreColor} />
                                        <div className="acc-score-center">
                                            <span className="acc-score-number" style={{ color: scoreColor }}><AnimatedNumber value={security.score} /></span>
                                            <span className="acc-score-max">/100</span>
                                        </div>
                                    </div>
                                    <div className="acc-score-info">
                                        <span className="acc-score-label" style={{ color: scoreColor, background: `${scoreColor}14` }}>{scoreLabel}</span>
                                        <p className="acc-score-desc">
                                            {security.score >= 80 ? 'Your CloudVault is well protected with strong security measures.' : 'Enable two-factor authentication to strengthen your account security.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="acc-security-features">
                                <h3>Security Features</h3>
                                <div className="acc-features-list">
                                    {security.features.map((item, i) => (
                                        <div key={i} className={`acc-feature-item ${item.active ? 'active' : ''}`} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                                            <div className="acc-feature-icon" style={{ background: item.active ? '#e8f0fe' : '#f8f9fa' }}>
                                                <item.icon size={20} color={item.active ? '#1a73e8' : '#80868b'} />
                                            </div>
                                            <div className="acc-feature-text">
                                                <h4>{item.label}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                            <span className={`acc-feature-badge ${item.active ? 'on' : 'off'}`}>
                                                {item.active ? <><Check size={12} /> Enabled</> : <><X size={12} /> Off</>}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ PROFILE TAB ═══ */}
                {activeSection === 'profile' && (
                    <div className="acc-section fade-slide-in">
                        <div className="acc-profile-card">
                            <UserProfile appearance={{
                                elements: {
                                    card: "shadow-none border-none p-0 bg-transparent",
                                    navbar: "hidden",
                                    headerTitle: "text-2xl font-bold text-slate-900",
                                    headerSubtitle: "text-slate-500",
                                    profileSectionTitleText: "text-slate-900 font-bold",
                                    scrollBox: "bg-transparent",
                                    pageScrollBox: "p-8",
                                    rootBox: "w-full",
                                }
                            }} />
                        </div>
                    </div>
                )}
            </main>

            {/* ── Styles ── */}
            <style>{`
                .acc-root { min-height: 100vh; background: #f0f4f9; font-family: 'Google Sans', 'Roboto', system-ui, sans-serif; color: #202124; }

                /* Header */
                .acc-header { display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 64px; background: #fff; border-bottom: 1px solid #e8eaed; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
                .acc-header-left { display: flex; align-items: center; gap: 16px; }
                .acc-back-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #5f6368; transition: all 0.2s; }
                .acc-back-btn:hover { background: #f1f3f4; color: #202124; }
                .acc-logo { display: flex; align-items: center; gap: 10px; }
                .acc-logo-icon { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, #4285f4, #1a73e8); display: flex; align-items: center; justify-content: center; }
                .acc-logo span { font-size: 1.15rem; font-weight: 600; color: #202124; }
                .acc-header-tabs { display: flex; gap: 4px; }
                .acc-tab { display: flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 20px; border: none; background: transparent; color: #5f6368; font-size: 0.88rem; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; }
                .acc-tab:hover { background: #f1f3f4; color: #202124; }
                .acc-tab.active { background: #e8f0fe; color: #1a73e8; font-weight: 600; }
                .acc-header-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #e8eaed; }
                .acc-header-user { display: flex; align-items: center; }

                /* Main */
                .acc-main { max-width: 1200px; margin: 0 auto; padding: 32px; }
                .acc-section { animation: fadeSlideIn 0.4s ease-out; }

                /* Hero */
                .acc-hero { background: #fff; border-radius: 20px; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border: 1px solid #e8eaed; box-shadow: 0 1px 3px rgba(0,0,0,0.04); animation: fadeSlideIn 0.4s ease-out; }
                .acc-hero-content { display: flex; align-items: center; gap: 20px; }
                .acc-hero-avatar-wrapper { position: relative; }
                .acc-hero-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #e8f0fe; }
                .acc-hero-avatar-placeholder { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #4285f4, #1a73e8); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.6rem; font-weight: 700; }
                .acc-hero-online { position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; border-radius: 50%; background: #34a853; border: 3px solid #fff; }
                .acc-hero-name { font-size: 1.4rem; font-weight: 600; color: #202124; margin-bottom: 4px; }
                .acc-hero-email { font-size: 0.88rem; color: #80868b; }
                .acc-hero-badge { display: flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 20px; background: linear-gradient(135deg, #e8f0fe, #d3e3fd); color: #1a73e8; font-weight: 600; font-size: 0.85rem; }

                /* Stats */
                .acc-stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 24px; }
                .acc-stat-card { background: #fff; border-radius: 16px; padding: 20px; border: 1px solid #e8eaed; display: flex; align-items: center; gap: 14px; cursor: default; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); animation: fadeSlideIn 0.4s both ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
                .acc-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                .acc-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .acc-stat-value { font-size: 1.5rem; font-weight: 700; color: #202124; line-height: 1.2; }
                .acc-stat-label { font-size: 0.78rem; color: #80868b; font-weight: 500; margin-top: 2px; }

                /* Storage */
                .acc-storage-card { background: #fff; border-radius: 20px; padding: 28px 32px; border: 1px solid #e8eaed; animation: fadeSlideIn 0.5s 0.2s both ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
                .acc-storage-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .acc-storage-header h3 { font-size: 1.15rem; font-weight: 600; color: #202124; margin-bottom: 4px; }
                .acc-storage-subtitle { font-size: 0.88rem; color: #80868b; }
                .acc-plan-badge { padding: 5px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.3px; }
                .acc-storage-bar-bg { height: 10px; background: #f0f4f9; border-radius: 6px; overflow: hidden; margin-bottom: 20px; }
                .acc-storage-bar-fill { height: 100%; border-radius: 6px; transition: width 2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; }
                .acc-storage-bar-fill::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%); animation: shimmer 2s infinite; }
                .acc-storage-breakdown { display: flex; gap: 28px; }
                .acc-storage-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #5f6368; }
                .acc-storage-item strong { color: #202124; font-weight: 600; }
                .acc-storage-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

                /* Security */
                .acc-security-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; }
                .acc-score-card { background: #fff; border-radius: 20px; padding: 32px; border: 1px solid #e8eaed; animation: fadeSlideIn 0.4s ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
                .acc-score-card h3 { font-size: 1.15rem; font-weight: 600; margin-bottom: 28px; }
                .acc-score-visual { display: flex; flex-direction: column; align-items: center; gap: 20px; }
                .acc-score-ring { position: relative; width: 140px; height: 140px; }
                .acc-score-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .acc-score-number { font-size: 2.4rem; font-weight: 800; line-height: 1; }
                .acc-score-max { font-size: 0.72rem; color: #80868b; margin-top: 2px; }
                .acc-score-info { text-align: center; }
                .acc-score-label { display: inline-block; padding: 4px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; margin-bottom: 10px; }
                .acc-score-desc { font-size: 0.88rem; color: #5f6368; line-height: 1.5; max-width: 280px; }
                .acc-security-features { background: #fff; border-radius: 20px; padding: 32px; border: 1px solid #e8eaed; animation: fadeSlideIn 0.4s 0.1s both ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
                .acc-security-features h3 { font-size: 1.15rem; font-weight: 600; margin-bottom: 20px; }
                .acc-features-list { display: flex; flex-direction: column; gap: 10px; }
                .acc-feature-item { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 14px; background: #f8f9fa; transition: all 0.2s; animation: fadeSlideIn 0.4s both ease-out; }
                .acc-feature-item:hover { background: #f0f4f9; transform: translateX(4px); }
                .acc-feature-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .acc-feature-text { flex: 1; }
                .acc-feature-text h4 { font-size: 0.92rem; font-weight: 600; color: #202124; margin-bottom: 2px; }
                .acc-feature-text p { font-size: 0.78rem; color: #80868b; }
                .acc-feature-badge { display: flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; flex-shrink: 0; }
                .acc-feature-badge.on { background: #e6f4ea; color: #1e8e3e; }
                .acc-feature-badge.off { background: #fce8e6; color: #d93025; }

                /* Profile */
                .acc-profile-card { background: #fff; border-radius: 20px; border: 1px solid #e8eaed; overflow: hidden; animation: fadeSlideIn 0.4s ease-out; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }

                /* Animations */
                @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                .fade-slide-in { animation: fadeSlideIn 0.4s ease-out; }

                /* Responsive */
                @media (max-width: 900px) {
                    .acc-stats-grid { grid-template-columns: repeat(3, 1fr); }
                    .acc-security-grid { grid-template-columns: 1fr; }
                    .acc-hero { flex-direction: column; align-items: flex-start; gap: 16px; }
                }
                @media (max-width: 600px) {
                    .acc-stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .acc-main { padding: 16px; }
                    .acc-header-tabs { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Account;
