import React, { useEffect, useRef } from 'react';

const Hyperspeed = ({
    effectOptions = {
        onDevice: 'all',
        speed: 5,
        distortion: 0.5,
        colors: {
            background: 0x000000,
            leftArches: 0x4f46e5,
            rightArches: 0x4f46e5,
            leftLines: 0xffffff,
            rightLines: 0xffffff,
        }
    }
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

        const stars = [];
        const starCount = 400;
        const velocity = effectOptions.speed || 5;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: (Math.random() - 0.5) * width,
                y: (Math.random() - 0.5) * height,
                z: Math.random() * width,
                o: Math.random(),
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX - width / 2) * 0.5;
            mouseY = (e.clientY - height / 2) * 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const draw = () => {
            ctx.fillStyle = '#0f172a'; // Deep slate background
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2 + mouseX;
            const centerY = height / 2 + mouseY;

            ctx.strokeStyle = `rgba(99, 102, 241, 0.5)`; // Indigo lines
            ctx.lineWidth = 2;

            stars.forEach(star => {
                star.z -= velocity;

                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width;
                    star.y = (Math.random() - 0.5) * height;
                }

                const k = 120 / star.z;
                const px = star.x * k + centerX;
                const py = star.y * k + centerY;

                if (px >= 0 && px <= width && py >= 0 && py <= height) {
                    const size = (1 - star.z / width) * 3;
                    const opacity = (1 - star.z / width);
                    
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    // Create a trail effect
                    const tailK = 120 / (star.z + velocity * 5);
                    const tx = star.x * tailK + centerX;
                    const ty = star.y * tailK + centerY;
                    ctx.lineTo(tx, ty);
                    
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                    ctx.stroke();

                    ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

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
    }, [effectOptions]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default Hyperspeed;
