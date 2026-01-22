import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Wrench, Hammer, Plug, Lightbulb, Box, Zap, Construction } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Background Transition
    const bgOpacity1 = useTransform(smoothProgress, [0, 0.4], [1, 0]);
    const bgOpacity2 = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);

    // Titles Animation
    const title1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const title1Y = useTransform(smoothProgress, [0, 0.3], [0, -100]);
    const title1Scale = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);

    const title2Opacity = useTransform(smoothProgress, [0.25, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const title2Y = useTransform(smoothProgress, [0.3, 0.5, 0.7], [100, 0, -100]);

    const title3Opacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1]);
    const title3Y = useTransform(smoothProgress, [0.7, 1], [100, 0]);

    // Tool Animations
    const toolboxScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);
    const toolboxRotate = useTransform(smoothProgress, [0, 1], [0, 15]);
    const toolboxY = useTransform(smoothProgress, [0, 1], [0, 200]);

    // Flying Tools Logic
    // Start at center (0,0), then fly out based on scroll
    const flyProgress = useTransform(smoothProgress, [0.1, 1], [0, 1]); // 0 to 1 as we scroll

    // Helper to create transforms
    const useToolTransform = (xEnd, yEnd, rotEnd, delay = 0) => {
        const x = useTransform(flyProgress, [0 + delay, 1], [0, xEnd]);
        const y = useTransform(flyProgress, [0 + delay, 1], [0, yEnd]);
        const r = useTransform(flyProgress, [0 + delay, 1], [0, rotEnd]);
        const o = useTransform(flyProgress, [0, 0.1 + delay], [0, 1]);
        return { x, y, rotate: r, opacity: o };
    };

    const t1 = useToolTransform(-400, -300, -45, 0);   // Top Left - Wrench
    const t2 = useToolTransform(450, -250, 90, 0.05);  // Top Right - Hammer
    const t3 = useToolTransform(-350, 200, -120, 0.1); // Bottom Left - Plug
    const t4 = useToolTransform(400, 150, 45, 0.15);   // Bottom Right - Lightbulb
    const t5 = useToolTransform(0, -400, 0, 0.2);      // Top Center - Zap
    const t6 = useToolTransform(0, 350, 180, 0.25);    // Bottom Center - Construction

    return (
        <section ref={containerRef} id="hero" className="relative h-[300vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* Background Layer 1: Deep Blue (Start) */}
                <motion.div style={{ opacity: bgOpacity1 }} className="absolute inset-0 bg-gradient-to-br from-primary via-[#2a4475] to-secondary flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </motion.div>

                {/* Background Layer 2: White/Mint (End) */}
                <motion.div style={{ opacity: bgOpacity2 }} className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-accent/30 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </motion.div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">

                    {/* Titles Container - Absolute Positioned to Center */}
                    <div className="absolute top-[20%] w-full max-w-6xl text-center pointer-events-none z-30">
                        <motion.h1 style={{ opacity: title1Opacity, y: title1Y, scale: title1Scale }} className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight drop-shadow-xl">
                            Soluciones Eléctricas <span className="text-accent block text-5xl md:text-7xl mt-4">Profesionales</span>
                        </motion.h1>

                        <motion.h1 style={{ opacity: title2Opacity, y: title2Y }} className="absolute top-0 w-full text-6xl md:text-8xl lg:text-9xl font-bold text-primary leading-tight">
                            Materiales de <span className="text-[#4b6cb7] block text-5xl md:text-7xl mt-4">Calidad Premium</span>
                        </motion.h1>

                        <motion.h1 style={{ opacity: title3Opacity, y: title3Y }} className="absolute top-0 w-full text-6xl md:text-8xl lg:text-9xl font-bold text-primary leading-tight">
                            Servicio Técnico <span className="text-[#36558F] block text-5xl md:text-7xl mt-4">Especializado</span>
                        </motion.h1>
                    </div>

                    {/* Toolbox / 3D Element Simulation */}
                    <div className="relative mt-32 md:mt-48 pointer-events-none">
                        {/* Flying Tools */}
                        <motion.div style={t1} className="absolute inset-0 flex items-center justify-center"><Wrench size={80} className="text-gray-300 fill-gray-400 drop-shadow-2xl" /></motion.div>
                        <motion.div style={t2} className="absolute inset-0 flex items-center justify-center"><Hammer size={100} className="text-gray-400 fill-gray-500 drop-shadow-2xl" /></motion.div>
                        <motion.div style={t3} className="absolute inset-0 flex items-center justify-center"><Plug size={90} className="text-accent fill-white stroke-primary drop-shadow-2xl" /></motion.div>
                        <motion.div style={t4} className="absolute inset-0 flex items-center justify-center"><Lightbulb size={90} className="text-yellow-400 fill-yellow-100 drop-shadow-2xl" /></motion.div>
                        <motion.div style={t5} className="absolute inset-0 flex items-center justify-center"><Zap size={120} className="text-blue-300 fill-blue-100 drop-shadow-2xl" /></motion.div>
                        <motion.div style={t6} className="absolute inset-0 flex items-center justify-center"><Construction size={80} className="text-orange-400 fill-orange-100 drop-shadow-2xl" /></motion.div>

                        {/* Central Toolbox */}
                        <motion.div
                            style={{
                                scale: toolboxScale,
                                rotateX: 20,
                                rotateY: toolboxRotate,
                                y: toolboxY
                            }}
                            className="relative z-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-b from-[#2a4475] to-[#1e3a8a] rounded-3xl shadow-[0_50px_100px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center border-t border-white/20"
                        >
                            <Box size={140} className="text-white/80" />

                            {/* Decorative Elements on Box */}
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-3xl backdrop-blur-[2px]"></div>
                        </motion.div>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-2 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
