import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const totalFrames = 90;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll (0 to 1) to frame index (0 to 89)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // 1. Preload Images for Performance
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = Array.from({ length: totalFrames }, (_, i) => {
                return new Promise((resolve, reject) => {
                    const frameNumber = String(i + 1).padStart(3, '0');
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Validate even if error to avoid blocking
                    img.src = `/Toolbox/frame-${frameNumber}.png`;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error preloading images:', error);
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, []);

    // 2. High-Performance Frame Update (Direct DOM Manipulation)
    useEffect(() => {
        return frameIndex.onChange(latest => {
            const frame = Math.round(latest);
            if (imageRef.current) {
                const frameNumber = String(frame + 1).padStart(3, '0');
                imageRef.current.src = `/Toolbox/frame-${frameNumber}.png`;
            }
        });
    }, [frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Loading State */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-accent rounded-full animate-spin"></div>
                            <span className="text-white/50 text-sm font-mono tracking-widest uppercase">Cargando Experiencia...</span>
                        </div>
                    </div>
                )}

                {/* Image Container */}
                <div className="w-full h-full flex items-center justify-center relative z-10">
                    <img
                        ref={imageRef}
                        src="/Toolbox/frame-001.png"
                        alt="Hero Animation"
                        className={`w-full h-full object-contain transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ willChange: 'contents' }} // Hint for browser optimization
                    />
                </div>

                {/* Optional Overlays / Call to Actions ensuring they are visible over the video */}
                <div className="absolute bottom-10 left-10 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: imagesLoaded ? 1 : 0, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white backdrop-blur-md bg-black/30 p-4 rounded-lg border border-white/10"
                    >
                        <h1 className="text-xl font-bold mb-1">Gama Industrial 2026</h1>
                        <p className="text-white/70 text-sm">Explora nuestra colección de herramientas</p>
                    </motion.div>
                </div>

                {/* Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imagesLoaded ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 right-10 text-white/50 text-xs font-mono uppercase tracking-widest z-20 flex flex-col items-center gap-2"
                >
                    <span>Scroll para explorar</span>
                    <div className="w-[1px] h-8 bg-white/20">
                        <motion.div
                            animate={{ height: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-full bg-accent"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
