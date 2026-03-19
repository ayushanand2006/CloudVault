import React, { useEffect, useRef } from 'react';

const GridMotion = ({
    items = [],
    gradientColor = 'black'
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouseX = width / 2;
        let mouseY = height / 2;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const gridSize = 60;
        const rows = Math.ceil(height / gridSize) + 2;
        const cols = Math.ceil(width / gridSize) + 2;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Draw radial glow center at mouse
            const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
            gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
            ctx.lineWidth = 1;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * gridSize;
                    const y = i * gridSize;

                    // Calculate distance to mouse for distortion
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const force = Math.max(0, (300 - dist) / 300);

                    const offsetX = dx * force * 0.2;
                    const offsetY = dy * force * 0.2;

                    // Draw grid lines
                    ctx.beginPath();
                    ctx.moveTo(x + offsetX, 0);
                    ctx.lineTo(x + offsetX, height);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, y + offsetY);
                    ctx.lineTo(width, y + offsetY);
                    ctx.stroke();

                    // Draw glowing intersections
                    if (force > 0.5) {
                        ctx.fillStyle = `rgba(79, 70, 229, ${force * 0.5})`;
                        ctx.beginPath();
                        ctx.arc(x + offsetX, y + offsetY, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                background: '#0f172a'
            }}
        />
    );
};

export default GridMotion;
