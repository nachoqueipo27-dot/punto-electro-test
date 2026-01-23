import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Wrench, Plug, Cable, Link2, Hammer, Lightbulb, Box, Zap } from 'lucide-react';

const Hero = () => {
    const sectionRef = useRef(null);
    const [activeSection, setActiveSection] = useState(0);

    const { scrollY } = useScroll();

    // Detectar sección activa basado en scrollY absoluto
    useMotionValueEvent(scrollY, "change", (latest) => {
        const sectionHeight = window.innerHeight;

        if (latest < sectionHeight) {
            setActiveSection(0);
        } else if (latest < sectionHeight * 2) {
            setActiveSection(1);
        } else {
            setActiveSection(2);
        }
    });

    // Usar scrollY directamente para animaciones más suaves
    const toolProgress = useTransform(scrollY, [0, 600], [0, 1]); // 600px de scroll = animación completa

    // Tool Animation mejorada y predecible
    const useToolAnimation = (initial, final, rotation) => {
        const x = useTransform(toolProgress, [0, 1], [initial.x, final.x]);
        const y = useTransform(toolProgress, [0, 1], [initial.y, final.y]);
        const rotate = useTransform(toolProgress, [0, 1], [0, rotation]);
        return { x, y, rotate };
    };

    const tools = [
        { Icon: Wrench, color: "text-white", opacity: "opacity-100", init: { x: -100, y: -80 }, final: { x: -500, y: -300 }, rot: -140 },
        { Icon: Plug, color: "text-electric", opacity: "opacity-90", init: { x: 100, y: -100 }, final: { x: 500, y: -280 }, rot: 200 },
        { Icon: Cable, color: "text-accent", opacity: "opacity-95", init: { x: -80, y: 120 }, final: { x: -400, y: 400 }, rot: 260 },
        { Icon: Link2, color: "text-white", opacity: "opacity-90", init: { x: 100, y: 140 }, final: { x: 400, y: 380 }, rot: -200 },
        { Icon: Hammer, color: "text-gray-400", opacity: "opacity-75", init: { x: -180, y: 20 }, final: { x: -550, y: 100 }, rot: 380 },
        { Icon: Lightbulb, color: "text-electric", opacity: "opacity-100", init: { x: 180, y: 40 }, final: { x: 550, y: 180 }, rot: -110 },
        { Icon: Box, color: "text-accent", opacity: "opacity-80", init: { x: 0, y: -140 }, final: { x: 0, y: -450 }, rot: 110 },
        { Icon: Zap, color: "text-white", opacity: "opacity-85", init: { x: 0, y: 180 }, final: { x: 0, y: 450 }, rot: -290 },
    ];

    const titles = [
        { main: "Soluciones Eléctricas", sub: "Profesionales y Confiables" },
        { main: "Materiales de", sub: "Calidad Premium" },
        { main: "Servicio Técnico", sub: "Especializado" },
    ];

    return (
        <React.Fragment>
            {/* HERO CONTAINER - Solo 100vh */}
            <section ref={sectionRef} id="hero" className="relative w-full h-screen overflow-hidden">
                <div className="w-full h-full overflow-hidden flex flex-col justify-center">

                    {/* --- 1. Dark Commercial Background --- */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] via-[#1A2847] to-[#0F1922]" />

                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#36558F_1px,transparent_1px)] [background-size:50px_50px] opacity-[0.08] pointer-events-none" />

                    {/* Dynamic Lighting Effects */}
                    <motion.div
                        style={{ y: useTransform(scrollY, [0, 800], [0, 300]) }}
                        className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-electric rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen"
                    />
                    <motion.div
                        style={{ y: useTransform(scrollY, [0, 800], [0, -250]) }}
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

                    {/* --- 3. Typography & Messaging --- */}
                    <div className="relative z-30 w-full max-w-7xl mx-auto px-6 text-center">
                        <div className="h-[250px] md:h-[300px] relative flex items-center justify-center">
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

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative mt-8 md:mt-12 flex flex-col items-center"
                        >
                            <a
                                href="#quote"
                                className="group relative bg-energy hover:bg-[#FF5520] text-white text-lg md:text-xl font-bold px-16 py-6 shadow-[0_20px_50px_-12px_rgba(255,107,53,0.5)] hover:shadow-[0_30px_70px_-12px_rgba(255,107,53,0.7)] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden rounded-lg"
                            >
                                <span className="relative z-10 tracking-widest uppercase">Solicitar Cotización</span>
                                <div className="absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
                            </a>
                        </motion.div>
                    </div>

                    {/* --- 4. Scroll Indicator --- */}
                    <motion.div
                        animate={{ opacity: activeSection === 2 ? 0 : 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
                    >
                        <span className="text-electric text-xs font-bold tracking-[0.3em] uppercase">Explorar</span>
                        <div className="w-[2px] h-16 bg-gradient-to-b from-electric/10 via-electric/40 to-electric/5 overflow-hidden">
                            <motion.div
                                animate={{ y: [-64, 64] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                className="w-full h-1/2 bg-electric shadow-[0_0_10px_#00D4FF]"
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Separador mínimo (reemplaza la sección de transición) */}
            <div className="h-px bg-gradient-to-r from-transparent via-energy/30 to-transparent" />
        </React.Fragment>
    );
};

export default Hero;
