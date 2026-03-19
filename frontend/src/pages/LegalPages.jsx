const LegalPage = ({ title, content }) => (
    <>
        <div style={{ padding: '100px 8%', maxWidth: '900px', margin: '0 auto', background: '#ffffff', color: '#0f172a' }} className="legal-container">
            <h1 style={{ fontSize: '4rem', fontWeight: '950', marginBottom: '60px', letterSpacing: '-2px' }}>{title}</h1>
            <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#475569' }}>
                {content.map((section, i) => (
                    <div key={i} style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '800', marginBottom: '20px' }}>{section.h}</h2>
                        <p>{section.p}</p>
                    </div>
                ))}
            </div>
        </div>
        <style>{`
            @media (max-width: 768px) {
                .legal-container { padding: 60px 6% !important; }
                h1 { font-size: 2.5rem !important; margin-bottom: 40px !important; }
                h2 { font-size: 1.5rem !important; }
                p { font-size: 1rem !important; }
            }
        `}</style>
    </>
);

export const Privacy = () => (
    <LegalPage 
        title="Privacy Policy" 
        content={[
            { h: "1. Data Collection", p: "We do not collect or monitor your file contents. All encryption happens client-side." },
            { h: "2. Metadata", p: "CloudVault stores minimal metadata (filenames, sizes) to help you manage your storage." },
            { h: "3. Third Parties", p: "We never sell your data. We use industry-standard infrastructure providers who are SOC2 compliant." }
        ]}
    />
);

export const Terms = () => (
    <LegalPage 
        title="Terms of Service" 
        content={[
            { h: "1. Acceptable Use", p: "You are responsible for all data stored in your vault. Do not store illegal materials." },
            { h: "2. Account Security", p: "You are responsible for safeguarding your master key. If you lose it, we cannot recover your data." },
            { h: "3. Termination", p: "We reserve the right to suspend accounts that violate our usage policies." }
        ]}
    />
);

export const Cookies = () => (
    <LegalPage 
        title="Cookie Policy" 
        content={[
            { h: "1. Necessity", p: "We use essential cookies to keep you logged in and remember your preferences." },
            { h: "2. Performance", p: "Subtle analytics cookies help us understand how to improve site speed and reliability." },
            { h: "3. Consent", p: "By using CloudVault, you agree to our use of essential storage for session management." }
        ]}
    />
);
