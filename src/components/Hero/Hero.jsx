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
    const circleBlueY = useTransform(smoothProgress, [0, 1], [0, 400]);
    const circleMintY = useTransform(smoothProgress, [0, 1], [0, -400]);

    const useToolAnimation = (initial, final, rotation) => {
        const x = useTransform(smoothProgress, [0, 1], [initial.x, final.x]);
        const y = useTransform(smoothProgress, [0, 1], [initial.y, final.y]);
        const rotate = useTransform(smoothProgress, [0, 1], [0, rotation]);
        const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.15, 1]);
        return { x, y, rotate, scale };
    };

    // Tools Configuration - High Visibility on Dark Background, alternating White, Electric, Accent
    const tools = [
        { Icon: Wrench, color: "text-white", opacity: "opacity-100", init: { x: -160, y: -120 }, final: { x: -650, y: -450 }, rot: -140 },
        { Icon: Plug, color: "text-electric", opacity: "opacity-90", init: { x: 160, y: -140 }, final: { x: 650, y: -400 }, rot: 200 },
        { Icon: Cable, color: "text-accent", opacity: "opacity-95", init: { x: -120, y: 160 }, final: { x: -550, y: 550 }, rot: 260 },
        { Icon: Link2, color: "text-white", opacity: "opacity-90", init: { x: 140, y: 200 }, final: { x: 500, y: 500 }, rot: -200 },
        { Icon: Hammer, color: "text-gray-400", opacity: "opacity-75", init: { x: -280, y: 20 }, final: { x: -750, y: 150 }, rot: 380 },
        { Icon: Lightbulb, color: "text-electric", opacity: "opacity-100", init: { x: 280, y: 60 }, final: { x: 750, y: 250 }, rot: -110 },
        { Icon: Box, color: "text-accent", opacity: "opacity-80", init: { x: 0, y: -220 }, final: { x: 0, y: -650 }, rot: 110 },
        { Icon: Zap, color: "text-white", opacity: "opacity-85", init: { x: 0, y: 280 }, final: { x: 0, y: 650 }, rot: -290 },
    ];

    const titles = [
        { main: "Soluciones Eléctricas", sub: "Profesionales y Confiables" },
        { main: "Materiales de", sub: "Calidad Premium" },
        { main: "Servicio Técnico", sub: "Especializado" },
    ];

    return (
        <React.Fragment>
            <section ref={containerRef} id="hero" className="relative h-[300vh] bg-secondary overflow-hidden">
                <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                    {/* --- 1. Dark Commercial Background --- */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] via-[#1A2847] to-[#0F1922]" />

                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#36558F_1px,transparent_1px)] [background-size:50px_50px] opacity-[0.08] pointer-events-none" />

                    {/* Dynamic Lighting Effects - Electric & Energy */}
                    <motion.div
                        style={{ y: circleBlueY }}
                        className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-electric rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen"
                    />
                    <motion.div
                        style={{ y: circleMintY }}
                        className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] bg-energy rounded-full blur-[150px] pointer-events-none opacity-15 mix-blend-screen"
                    />

                    {/* --- 2. Floating Tools with Glow --- */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        {tools.map((item, index) => {
                            const anim = useToolAnimation(item.init, item.final, item.rot);
                            return (
                                <motion.div
                                    key={index}
                                    style={anim}
                                    className={`absolute ${item.color} ${item.opacity} filter drop-shadow-[0_0_20px_rgba(0,212,255,0.2)]`}
                                >
                                    <item.Icon
                                        strokeWidth={1.5}
                                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* --- 3. Typography & Messaging (White on Dark) --- */}
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
                                            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] mb-6">
                                                {t.main}
                                            </h1>
                                            <h2 className="text-3xl md:text-5xl font-light text-white/70 tracking-wide drop-shadow-md">
                                                {t.sub}
                                            </h2>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Energetic CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative mt-10 md:mt-16 flex flex-col items-center"
                        >
                            <a
                                href="#quote"
                                className="group relative bg-energy hover:bg-[#FF5520] text-white text-lg md:text-xl font-bold px-16 py-6 shadow-[0_20px_50px_-12px_rgba(255,107,53,0.5)] hover:shadow-[0_30px_70px_-12px_rgba(255,107,53,0.7)] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden rounded-lg"
                            >
                                <span className="relative z-10 tracking-widest uppercase">Solicitar Cotización</span>
                                {/* Shine Effect */}
                                <div className="absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
                            </a>
                        </motion.div>
                    </div>

                    {/* --- 4. Electric Scroll Indicator --- */}
                    <motion.div
                        animate={{ opacity: activeSection === 2 ? 0 : 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 z-20"
                    >
                        <span className="text-electric text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase glow-text">Explorar</span>
                        <div className="w-[2px] h-20 bg-gradient-to-b from-electric/10 via-electric/40 to-electric/5 overflow-hidden">
                            <motion.div
                                animate={{ y: [-80, 80] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                className="w-full h-1/2 bg-electric shadow-[0_0_10px_#00D4FF]"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 5. Seamless Transition Section */}
            <section className="py-24 bg-light flex flex-col items-center justify-center relative z-10 border-t border-secondary/10">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6 text-primary">
                        <ArrowDown size={32} />
                    </div>
                    <p className="text-primary text-2xl font-light tracking-wide italic font-serif opacity-80">"Energía experta para proyectos exigentes"</p>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Hero;
