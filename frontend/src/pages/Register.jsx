import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { HardDrive, ShieldCheck, Database, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1a2e50 40%, #163366 70%, #1565c0 100%)', position: 'relative', overflow: 'hidden' }}>
            
            {/* Floating Blobs */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(66,133,244,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,115,232,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Grid Pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

            {/* Floating Orbs */}
            <div style={{ position: 'absolute', top: '20%', right: '18%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', animation: 'float1 6s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: '65%', right: '8%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(100,160,255,0.5)', animation: 'float2 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: '40%', left: '10%', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', animation: 'float1 7s ease-in-out infinite reverse' }} />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '80px', padding: '40px 48px' }}>
                
                {/* Branding Side */}
                <div style={{ color: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #4285f4, #1a73e8)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(26,115,232,0.4), inset 0 1px 1px rgba(255,255,255,0.2)' }}>
                            <HardDrive color="white" size={28} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', color: '#fff' }}>CloudVault</span>
                    </div>
                    
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1.5px', color: '#fff' }}>
                        Join the future<br />
                        <span style={{ color: '#4285f4' }}>of private storage.</span>
                    </h2>
                    
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '48px', lineHeight: '1.7', maxWidth: '400px' }}>
                        Create your account in seconds. Get 15GB of encrypted storage instantly — no credit card required.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { icon: Gift, text: '15 GB free storage — no card needed' },
                            { icon: ShieldCheck, text: 'Client-side zero-knowledge encryption' },
                            { icon: Database, text: 'Data portability & full ownership' },
                        ].map(({ icon: Icon, text }, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(66,133,244,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={18} color="#4285f4" />
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '500', fontSize: '0.95rem' }}>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Register Form Side */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.97)', padding: '8px', borderRadius: '28px', boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)', width: '100%', maxWidth: '420px' }}>
                        <SignUp 
                            routing="path" 
                            path="/register" 
                            signInUrl="/login"
                            appearance={{
                                elements: {
                                    rootBox: "w-full",
                                    card: "shadow-none border-none bg-transparent",
                                    headerTitle: "text-slate-900 font-black text-2xl",
                                    headerSubtitle: "text-slate-500 font-medium",
                                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 transition-all rounded-xl py-3 text-sm font-bold",
                                    formFieldLabel: "text-slate-700 font-semibold",
                                    formFieldInput: "bg-slate-50 border-slate-200 focus:border-blue-500 rounded-xl",
                                    footerActionText: "text-slate-500",
                                    footerActionLink: "text-blue-600 font-bold hover:text-blue-700",
                                    socialButtonsBlockButton: "border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all",
                                    socialButtonsBlockButtonText: "text-slate-600 font-semibold",
                                    dividerLine: "bg-slate-200",
                                    dividerText: "text-slate-400 font-semibold"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float1 { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; } 50% { transform: translateY(-20px) scale(1.15); opacity: 0.7; } }
                @keyframes float2 { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; } 50% { transform: translateY(-14px) translateX(10px); opacity: 0.8; } }
            `}</style>
        </div>
    );
};

export default Register;
