import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const totalFrames = 240; // Updated to 240 frames

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll (0 to 1) to frame index (0 to 239)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // 1. Preload Images
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = Array.from({ length: totalFrames }, (_, i) => {
                return new Promise((resolve, reject) => {
                    // Format: frame_000.jpg (Underscore, 3 digits, .jpg)
                    const frameNumber = String(i).padStart(3, '0');
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                    img.src = `/Toolbox/frame_${frameNumber}.jpg`;
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

    // 2. Efficient Frame Update
    useEffect(() => {
        return frameIndex.onChange(latest => {
            const frame = Math.round(latest);
            if (imageRef.current) {
                const frameNumber = String(frame).padStart(3, '0');
                imageRef.current.src = `/Toolbox/frame_${frameNumber}.jpg`;
            }
        });
    }, [frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-black"> {/* Increased height for finer control over 240 frames */}

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Loading Spinner */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-accent rounded-full animate-spin"></div>
                            <span className="text-white/50 text-sm font-mono tracking-widest uppercase">Cargando 240 Frames...</span>
                        </div>
                    </div>
                )}

                {/* Image Sequence with "HD Enhancer" Filters */}
                <div className="w-full h-full flex items-center justify-center relative z-10">
                    <div className="absolute inset-0 bg-black/5 z-20 pointer-events-none mix-blend-overlay" /> {/* Contrast Booster */}
                    <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/200%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                    /> {/* Noise to hide artifacts */}

                    <img
                        ref={imageRef}
                        src="/Toolbox/frame_000.jpg" // Initial frame
                        alt="Hero Animation"
                        className={`w-full h-full object-cover transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            willChange: 'contents',
                            filter: 'contrast(1.15) saturate(1.1) brightness(1.05) drop-shadow(0 0 1px rgba(0,0,0,0.5))', // Perceptual HD Stacking
                            imageRendering: 'high-quality'
                        }}
                    />
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-12 left-12 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: imagesLoaded ? 1 : 0, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white backdrop-blur-md bg-black/40 p-6 rounded-lg border border-white/10 max-w-md shadow-2xl"
                    >
                        <div className="inline-block px-3 py-1 mb-2 bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider rounded border border-accent/20">
                            Ingeniería de Precisión
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-white">Equipamiento Industrial</h1>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Visualiza cada detalle de nuestra gama de herramientas profesionales. Controla la experiencia con tu scroll.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imagesLoaded ? 1 : 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 right-10 text-white/40 text-[10px] font-mono uppercase tracking-widest z-20 flex flex-col items-center gap-2"
                >
                    <span>Scroll</span>
                    <div className="w-[1px] h-12 bg-white/10">
                        <motion.div
                            animate={{ y: [0, 48], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-[2px] h-2 bg-accent rounded-full -ml-[0.5px]"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
