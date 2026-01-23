import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageFormat, setImageFormat] = useState('jpg'); // Auto-detect WebP
    const totalFrames = 240;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Detectar soporte de WebP
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const webpData = canvas.toDataURL('image/webp');
        const webpSupported = webpData.indexOf('image/webp') === 5;
        setImageFormat(webpSupported ? 'webp' : 'jpg');
        console.log(`✓ Formato soportado: ${webpSupported ? 'WebP (mejor calidad)' : 'JPG'}`);
    }, []);

    // Preload Images - Silencioso (no bloquea UI)
    useEffect(() => {
        if (imageFormat === '') return;

        const preloadImages = () => {
            // Precargar solo frames cercanos (lazy loading inteligente)
            const imagesToPreload = [0, 50, 100, 150, 200, 239]; // Key frames

            imagesToPreload.forEach(i => {
                const frameNumber = String(i).padStart(3, '0');
                const img = new Image();
                img.src = `/Toolbox/frame_${frameNumber}.${imageFormat}`;
            });
        };

        preloadImages();

        // Marcar como listo después de primer frame
        setTimeout(() => {
            setImagesLoaded(true);
        }, 500);
    }, [imageFormat]);

    // Frame Update - Máxima Calidad
    useEffect(() => {
        if (!imageRef.current || imageFormat === '') return;

        return frameIndex.onChange(latest => {
            const frame = Math.round(latest);
            const frameNumber = String(frame).padStart(3, '0');

            // Alternar entre JPG y WebP automáticamente
            const imagePath = `/Toolbox/frame_${frameNumber}.${imageFormat}`;

            // Cambio suave de imagen
            const img = new Image();
            img.onload = () => {
                if (imageRef.current) {
                    imageRef.current.src = imagePath;
                }
            };
            img.onerror = () => {
                // Fallback a JPG si WebP falla
                if (imageFormat === 'webp' && imageRef.current) {
                    imageRef.current.src = imagePath.replace('.webp', '.jpg');
                }
            };
            img.src = imagePath;
        });
    }, [frameIndex, imageFormat]);

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Loading State - Elegante */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-accent rounded-full animate-spin"></div>
                            <span className="text-white/50 text-sm font-mono tracking-widest uppercase">
                                Cargando 240 Frames en {imageFormat.toUpperCase()}...
                            </span>
                        </div>
                    </div>
                )}

                {/* Imagen en MÁXIMA CALIDAD */}
                <img
                    ref={imageRef}
                    src={`/Toolbox/frame_000.${imageFormat}`}
                    alt="Hero Animation Sequence"
                    className={`w-full h-full object-cover transition-opacity duration-200 ${imagesLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        willChange: 'contents',
                        // ⭐ CONFIGURACIÓN DE CALIDAD MÁXIMA
                        imageRendering: 'high-quality',
                        filter: 'contrast(1.02) brightness(1.02)', // MÍNIMO filtrado (casi nada)
                        backfaceVisibility: 'hidden',
                        perspective: '1000px'
                    }}
                    decoding="async"
                    loading="lazy"
                />

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
                            Visualiza cada detalle en resolución máxima. Controla con tu scroll.
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
