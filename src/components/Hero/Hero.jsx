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

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 15 });

    // Update active section logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const height = window.innerHeight;
        // Breakpoints for 3 sections within 300vh
        if (latest < height * 0.9) {
            setActiveSection(0);
        } else if (latest < height * 1.9) {
            setActiveSection(1);
        } else {
            setActiveSection(2);
        }
    });

    // --- Parallax & Animations ---

    // Enhanced Background Movement
    const circleBlueY = useTransform(smoothProgress, [0, 1], [0, 400]);
    const circleMintY = useTransform(smoothProgress, [0, 1], [0, -400]);

    // Tools Animation Helper
    const useToolAnimation = (initial, final, rotation) => {
        const x = useTransform(smoothProgress, [0, 1], [initial.x, final.x]);
        const y = useTransform(smoothProgress, [0, 1], [initial.y, final.y]);
        const rotate = useTransform(smoothProgress, [0, 1], [0, rotation]);
        const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]); // Subtle pulse
        return { x, y, rotate, scale };
    };

    // Configuration for Tools (More explicit colors, bigger movements)
    const tools = [
        { Icon: Wrench, color: "text-primary", opacity: "opacity-75", init: { x: -150, y: -100 }, final: { x: -600, y: -400 }, rot: -120 },
        { Icon: Plug, color: "text-slate-700", opacity: "opacity-60", init: { x: 150, y: -120 }, final: { x: 600, y: -350 }, rot: 180 },
        { Icon: Cable, color: "text-accent", opacity: "opacity-80", init: { x: -100, y: 150 }, final: { x: -500, y: 500 }, rot: 240 },
        { Icon: Link2, color: "text-primary", opacity: "opacity-70", init: { x: 120, y: 180 }, final: { x: 450, y: 450 }, rot: -180 },
        { Icon: Hammer, color: "text-slate-400", opacity: "opacity-60", init: { x: -250, y: 0 }, final: { x: -700, y: 100 }, rot: 360 },
        { Icon: Lightbulb, color: "text-accent", opacity: "opacity-90", init: { x: 250, y: 50 }, final: { x: 700, y: 200 }, rot: -90 },
        { Icon: Box, color: "text-primary", opacity: "opacity-65", init: { x: 0, y: -200 }, final: { x: 0, y: -600 }, rot: 90 },
        { Icon: Zap, color: "text-slate-600", opacity: "opacity-70", init: { x: 0, y: 250 }, final: { x: 0, y: 600 }, rot: -270 },
    ];

    const titles = [
        { main: "Soluciones Eléctricas", sub: "Profesionales y Confiables" },
        { main: "Materiales de", sub: "Calidad Premium" },
        { main: "Servicio Técnico", sub: "Especializado" },
    ];

    return (
        <React.Fragment>
            <section ref={containerRef} id="hero" className="relative h-[300vh] bg-white">
                <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                    {/* 1. Enhanced Background Layers */}

                    {/* Base Subtle Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#36558F_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-[0.03] pointer-events-none" />

                    {/* Dramatic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white via-50% to-accent/15 opacity-100 pointer-events-none" />

                    {/* Animated Deep Blurred Circles - More Visible */}
                    <motion.div
                        style={{ y: circleBlueY }}
                        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"
                    />
                    <motion.div
                        style={{ y: circleMintY }}
                        className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-accent/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply"
                    />

                    {/* 2. Floating Tools - High Visibility & Drama */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        {tools.map((item, index) => {
                            const anim = useToolAnimation(item.init, item.final, item.rot);
                            return (
                                <motion.div
                                    key={index}
                                    style={anim}
                                    className={`absolute ${item.color} ${item.opacity} drop-shadow-lg`}
                                >
                                    {/* Responsive Icon Sizes */}
                                    <item.Icon
                                        strokeWidth={1.2}
                                        className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 3. Main Content - High Contrast Typography */}
                    <div className="relative z-30 w-full max-w-7xl mx-auto px-6 text-center">
                        <div className="h-[250px] md:h-[350px] relative flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {titles.map((t, index) => (
                                    activeSection === index && (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                                rotateX: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 1.1,
                                                y: -30,
                                                filter: "blur(8px)",
                                                rotateX: 10
                                            }}
                                            transition={{ duration: 0.8, ease: "circOut" }}
                                            className="absolute w-full flex flex-col items-center"
                                        >
                                            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary tracking-tight leading-[0.9] drop-shadow-sm mb-6">
                                                {t.main}
                                            </h1>
                                            <h2 className="text-4xl md:text-5xl font-light text-primary/80 tracking-wide">
                                                {t.sub}
                                            </h2>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Stabilized CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="relative mt-8 md:mt-12 flex flex-col items-center"
                        >
                            <a
                                href="#quote"
                                className="group relative bg-primary text-white text-lg md:text-xl font-medium px-12 py-5 shadow-[0_20px_40px_-15px_rgba(54,85,143,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(54,85,143,0.5)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="relative z-10">Solicitar Cotización</span>
                                <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </a>

                            {/* Decorative line under CTA */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="h-[1px] bg-primary/20 mt-8"
                            />
                        </motion.div>
                    </div>

                    {/* 4. Elegant Scroll Indicator */}
                    <motion.div
                        animate={{ opacity: activeSection === 2 ? 0 : 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
                    >
                        <span className="text-primary/60 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">Explorar</span>
                        <div className="w-[2px] h-16 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/0 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ y: [-64, 64] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full h-1/2 bg-primary"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 5. Seamless Transition Section */}
            <section className="py-24 bg-gradient-to-b from-white to-[#F5F9FA] flex flex-col items-center justify-center relative z-10">
                <div className="text-center opacity-70 hover:opacity-100 transition-opacity duration-500">
                    <div className="p-4 rounded-full bg-primary/5 mb-6 inline-block">
                        <ArrowDown className="text-primary" size={32} />
                    </div>
                    <p className="text-primary text-2xl font-light tracking-wide">Descubre la excelencia en cada detalle</p>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Hero;
