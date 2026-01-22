import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Wrench, Plug, Cable, Link2, Hammer, Lightbulb, Box, Settings, ArrowDown, Zap } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState(0);

    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    // Update active section logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const height = window.innerHeight;
        if (latest < height * 0.9) {
            setActiveSection(0);
        } else if (latest < height * 1.9) {
            setActiveSection(1);
        } else {
            setActiveSection(2);
        }
    });

    // --- Parallax & Animations ---

    // Enhanced Background Movement - Dramatic movements
    const circleBlueY = useTransform(smoothProgress, [0, 1], [0, 500]);
    const circleMintY = useTransform(smoothProgress, [0, 1], [0, -500]);

    // Tools Animation Helper with stronger scale and rotation
    const useToolAnimation = (initial, final, rotation) => {
        const x = useTransform(smoothProgress, [0, 1], [initial.x, final.x]);
        const y = useTransform(smoothProgress, [0, 1], [initial.y, final.y]);
        const rotate = useTransform(smoothProgress, [0, 1], [0, rotation]);
        const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.15, 1]);
        return { x, y, rotate, scale };
    };

    // Configuration for Tools - High Visibility & Commercial Look
    const tools = [
        { Icon: Wrench, color: "text-primary", opacity: "opacity-90", init: { x: -160, y: -120 }, final: { x: -650, y: -450 }, rot: -140 },
        { Icon: Plug, color: "text-[#4a5568]", opacity: "opacity-80", init: { x: 160, y: -140 }, final: { x: 650, y: -400 }, rot: 200 },
        { Icon: Cable, color: "text-accent", opacity: "opacity-95", init: { x: -120, y: 160 }, final: { x: -550, y: 550 }, rot: 260 },
        { Icon: Link2, color: "text-primary", opacity: "opacity-85", init: { x: 140, y: 200 }, final: { x: 500, y: 500 }, rot: -200 },
        { Icon: Hammer, color: "text-[#718096]", opacity: "opacity-75", init: { x: -280, y: 20 }, final: { x: -750, y: 150 }, rot: 380 },
        { Icon: Lightbulb, color: "text-accent", opacity: "opacity-100", init: { x: 280, y: 60 }, final: { x: 750, y: 250 }, rot: -110 },
        { Icon: Box, color: "text-primary", opacity: "opacity-80", init: { x: 0, y: -220 }, final: { x: 0, y: -650 }, rot: 110 },
        { Icon: Zap, color: "text-[#2d3748]", opacity: "opacity-85", init: { x: 0, y: 280 }, final: { x: 0, y: 650 }, rot: -290 },
    ];

    const titles = [
        { main: "Soluciones Eléctricas", sub: "Profesionales y Confiables" },
        { main: "Materiales de", sub: "Calidad Premium" },
        { main: "Servicio Técnico", sub: "Especializado" },
    ];

    return (
        <React.Fragment>
            <section ref={containerRef} id="hero" className="relative h-[300vh] bg-warmGray-100 overflow-hidden">
                <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                    {/* --- 1. Commercial Background Layering --- */}

                    {/* Base Gradient - Warm & Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-warmGray-50 via-warmGray-100 to-warmGray-150 pointer-events-none" />

                    {/* Subtle Texture - Diagonal Lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#36558F_0.5px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

                    {/* Dramatic Blurred Orbs - VISIBLE & VIBRANT */}
                    <motion.div
                        style={{ y: circleBlueY }}
                        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-60"
                    />
                    <motion.div
                        style={{ y: circleMintY }}
                        className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-accent/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-70"
                    />

                    {/* Decorative Geometric Elements */}
                    <div className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                    <div className="absolute right-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

                    <motion.div
                        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] right-[15%] w-3 h-3 rounded-full bg-primary/20 pointer-events-none"
                    />

                    {/* --- 2. Floating Tools with Commercial Depth --- */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        {tools.map((item, index) => {
                            const anim = useToolAnimation(item.init, item.final, item.rot);
                            return (
                                <motion.div
                                    key={index}
                                    style={anim}
                                    className={`absolute ${item.color} ${item.opacity} filter drop-shadow-[0_15px_25px_rgba(54,85,143,0.15)]`}
                                >
                                    <item.Icon
                                        strokeWidth={1.5}
                                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* --- 3. Typography & Messaging (High Contrast) --- */}
                    <div className="relative z-30 w-full max-w-7xl mx-auto px-6 text-center">
                        <div className="h-[280px] md:h-[380px] relative flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {titles.map((t, index) => (
                                    activeSection === index && (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 1.05,
                                                y: -40,
                                                filter: "blur(10px)",
                                            }}
                                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute w-full flex flex-col items-center"
                                        >
                                            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tight leading-[0.9] drop-shadow-[0_4px_10px_rgba(54,85,143,0.1)] mb-6">
                                                {t.main}
                                            </h1>
                                            <h2 className="text-3xl md:text-5xl font-light text-primary/80 tracking-wide drop-shadow-sm">
                                                {t.sub}
                                            </h2>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative mt-10 md:mt-16 flex flex-col items-center"
                        >
                            <a
                                href="#quote"
                                className="group relative bg-[#36558F] text-white text-lg md:text-xl font-medium px-14 py-6 shadow-[0_20px_50px_-12px_rgba(54,85,143,0.4)] hover:shadow-[0_30px_60px_-12px_rgba(54,85,143,0.6)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden rounded-sm"
                            >
                                <span className="relative z-10 tracking-wide">SOLICITAR COTIZACIÓN</span>
                                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </a>
                        </motion.div>
                    </div>

                    {/* --- 4. Premium Scroll Indicator --- */}
                    <motion.div
                        animate={{ opacity: activeSection === 2 ? 0 : 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 z-20"
                    >
                        <span className="text-primary/50 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Scroll</span>
                        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 overflow-hidden">
                            <motion.div
                                animate={{ y: [-80, 80] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-1/2 bg-primary"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 5. Seamless Transition Section */}
            <section className="py-24 bg-warmGray-100 flex flex-col items-center justify-center relative z-10 border-t border-primary/5">
                <div className="text-center opacity-60 hover:opacity-90 transition-opacity duration-500">
                    <p className="text-primary text-2xl font-light tracking-wide italic font-serif">"Calidad que energiza tus proyectos"</p>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Hero;
