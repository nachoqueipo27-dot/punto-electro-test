import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Wrench, Plug, Cable, Link2, Hammer, Lightbulb, Box, Settings, ArrowDown } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    // Track the active section for text changes
    const [activeSection, setActiveSection] = useState(0);

    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    // Update active section based on scroll position
    // We assume the hero is roughly 3 screens tall (300vh), so we divide into 3 sections
    useMotionValueEvent(scrollY, "change", (latest) => {
        const height = window.innerHeight;
        if (latest < height * 0.8) {
            setActiveSection(0);
        } else if (latest < height * 1.6) {
            setActiveSection(1);
        } else {
            setActiveSection(2);
        }
    });

    // --- Parallax & Animations ---

    // Background Circles Movement
    const circleY = useTransform(smoothProgress, [0, 1], [0, -300]);
    const circleRotate = useTransform(smoothProgress, [0, 1], [0, 90]);

    // Tools Animation
    // We'll create a helper to generate transforms for each tool
    // They spread out and rotate as we scroll
    const useToolAnimation = (initialPos, finalPos, rotationRange) => {
        const x = useTransform(smoothProgress, [0, 1], [initialPos.x, finalPos.x]);
        const y = useTransform(smoothProgress, [0, 1], [initialPos.y, finalPos.y]);
        const rotate = useTransform(smoothProgress, [0, 1], [0, rotationRange]);
        return { x, y, rotate };
    };

    // Tool Configurations
    // Initial positions are somewhat centered/clumped, final are dispersed
    const tools = [
        { Icon: Wrench, color: "text-primary", init: { x: -100, y: -50 }, final: { x: -400, y: -200 }, rot: -45 },
        { Icon: Plug, color: "text-gray-400", init: { x: 100, y: -80 }, final: { x: 450, y: -300 }, rot: 90 },
        { Icon: Cable, color: "text-[#C5E0D8]", init: { x: -50, y: 100 }, final: { x: -350, y: 300 }, rot: 120 },
        { Icon: Link2, color: "text-primary", init: { x: 80, y: 120 }, final: { x: 300, y: 250 }, rot: -90 },
        { Icon: Hammer, color: "text-gray-300", init: { x: -150, y: 0 }, final: { x: -500, y: 50 }, rot: 180 },
        { Icon: Lightbulb, color: "text-[#C5E0D8]", init: { x: 180, y: 20 }, final: { x: 550, y: 100 }, rot: -60 },
        { Icon: Box, color: "text-primary", init: { x: 0, y: -150 }, final: { x: 0, y: -450 }, rot: 45 },
        { Icon: Settings, color: "text-gray-400", init: { x: 0, y: 180 }, final: { x: 0, y: 400 }, rot: -135 },
    ];

    // Titles Configuration
    const titles = [
        { main: "Soluciones Eléctricas", sub: "Profesionales y Confiables" },
        { main: "Materiales de", sub: "Calidad Premium" },
        { main: "Servicio Técnico", sub: "Especializado" },
    ];

    return (
        <React.Fragment>
            <section ref={containerRef} id="hero" className="relative h-[300vh]">
                <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">

                    {/* 1. Background Effects */}
                    {/* Gradient Mesh */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5F9FA] to-[#E6F0EE] opacity-80" />

                    {/* Floating Blurs - Parallax */}
                    <motion.div
                        style={{ y: circleY, rotate: circleRotate }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#36558F] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"
                    />
                    <motion.div
                        style={{ y: useTransform(circleY, v => v * -0.5), rotate: useTransform(circleRotate, v => v * -1) }}
                        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#C5E0D8] rounded-full blur-[100px] opacity-[0.3] pointer-events-none"
                    />

                    {/* 2. Floating Tools */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        {tools.map((item, index) => {
                            const anim = useToolAnimation(item.init, item.final, item.rot);
                            return (
                                <motion.div
                                    key={index}
                                    style={{ x: anim.x, y: anim.y, rotate: anim.rotate }}
                                    className={`absolute ${item.color} opacity-40 [&>svg]:w-16 [&>svg]:h-16 md:[&>svg]:w-24 md:[&>svg]:h-24`}
                                >
                                    <item.Icon strokeWidth={1.5} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 3. Main Content - Dynamic Titles */}
                    <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="h-[200px] md:h-[250px] flex items-center justify-center relative w-full">
                            {titles.map((t, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                    animate={{
                                        opacity: activeSection === index ? 1 : 0,
                                        y: activeSection === index ? 0 : -20,
                                        filter: activeSection === index ? "blur(0px)" : "blur(10px)"
                                    }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute w-full"
                                >
                                    <h1 className="text-6xl md:text-9xl font-bold text-primary tracking-tight mb-4">
                                        {t.main}
                                    </h1>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary/60">
                                        {t.sub}
                                    </h2>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-16"
                        >
                            <a
                                href="#quote"
                                className="inline-block bg-primary text-white text-lg font-medium px-10 py-5 shadow-xl hover:shadow-2xl hover:bg-black/80 transition-all transform hover:-translate-y-1"
                            >
                                Solicitar Cotización
                            </a>
                        </motion.div>
                    </div>

                    {/* 4. Scroll Indicator */}
                    <motion.div
                        animate={{ opacity: activeSection === 2 ? 0 : 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
                    >
                        <span className="text-primary/40 text-sm font-medium tracking-wide">Desplázate para explorar</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0">
                            <motion.div
                                animate={{ y: [0, 48, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-1/3 bg-primary"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 5. Extended Scroll Section */}
            <section className="h-96 bg-gradient-to-b from-white to-[#F5F9FA] flex items-center justify-center">
                <div className="text-center opacity-40">
                    <ArrowDown className="mx-auto mb-4 text-primary" size={32} />
                    <p className="text-primary text-xl font-light">Continúa explorando nuestros servicios</p>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Hero;
