import { ArrowLeft, Book, Code, Terminal } from 'lucide-react';

const Documentation = () => {
    return (
        <div style={{ position: 'relative', display: 'flex', background: '#ffffff' }}>
                {/* Sidebar */}
                <div style={{ width: '300px', height: 'calc(100vh - 80px)', background: '#f8fafc', borderRight: '1px solid rgba(0,0,0,0.05)', padding: '40px', position: 'sticky', top: '80px' }} className="doc-sidebar">
                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '2px', marginBottom: '30px' }}>Getting Started</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ fontWeight: '700', color: 'var(--primary)' }}>Introduction</p>
                        <p style={{ color: '#64748b', cursor: 'pointer' }}>Quick Setup</p>
                        <p style={{ color: '#64748b', cursor: 'pointer' }}>Architecture</p>
                        <p style={{ color: '#64748b', cursor: 'pointer' }}>CLI Reference</p>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '100px 8%', maxWidth: '1000px', color: '#0f172a' }} className="doc-content">
                    <h1 style={{ fontSize: '4rem', fontWeight: '950', marginBottom: '20px', letterSpacing: '-2px' }}>Developer Documentation</h1>
                    <p style={{ fontSize: '1.4rem', color: '#64748b', marginBottom: '60px' }}>Everything you need to build secure cloud integrations.</p>

                    <div style={{ padding: '60px', background: '#f8fafc', borderRadius: '40px', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '60px' }} className="doc-card">
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '30px' }}>Quick Installation</h2>
                        <div style={{ background: '#0f172a', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '1.1rem' }} className="code-block">
                            <span style={{ color: '#818cf8' }}>$ npm install @cloudvault/sdk</span>
                            <div style={{ cursor: 'pointer', color: 'white', opacity: 0.5 }}>Copy</div>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '850', marginBottom: '30px' }}>API Overview</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#475569', marginBottom: '40px' }}>
                        The CloudVault API is RESTful and uses standard HTTP status codes. All requests must be authenticated via a Bearer token generated from your dashboard settings.
                    </p>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .doc-sidebar { display: none !important; }
                        .doc-content { padding: 60px 6% !important; }
                        h1 { font-size: 2.5rem !important; }
                        .doc-card { padding: 32px !important; borderRadius: 24px !important; }
                    }
                    @media (max-width: 768px) {
                        .code-block { flex-direction: column; align-items: flex-start !important; gap: 15px; }
                    }
                `}</style>
            </div>
    );
};

export default Documentation;
