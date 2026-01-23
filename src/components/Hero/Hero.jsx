import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Wrench, Plug, Cable, Link2, Hammer, Lightbulb, Box, Zap, Activity } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    // --- State 1: Solutions (0 - 33%) ---
    const opacity1 = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const scale1 = useTransform(smoothProgress, [0, 0.25], [1, 0.8]);

    // --- State 2: Quality (33% - 66%) ---
    const opacity2 = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.3, 0.5, 0.7], [50, 0, -50]);

    // --- State 3: Service (66% - 100%) ---
    const opacity3 = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const scale3 = useTransform(smoothProgress, [0.65, 1], [0.9, 1]);

    // --- Dynamic Backgrounds ---
    const bgGradient1 = useTransform(smoothProgress, [0, 0.3], [1, 0]);
    const bgGradient2 = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const bgGradient3 = useTransform(smoothProgress, [0.7, 1], [0, 1]);

    // --- Tool Animations (Multi-stage with specific positions) ---
    // State 1: Solutions focus (Scattered)
    const t1_x = useTransform(smoothProgress, [0, 0.3], [0, -150]);
    const t1_y = useTransform(smoothProgress, [0, 0.3], [0, -100]);

    // State 2: Products focus (Grid/Organized feel)
    const t2_x = useTransform(smoothProgress, [0.3, 0.6], [0, 200]);
    const t2_y = useTransform(smoothProgress, [0.3, 0.6], [0, 50]);
    const t2_rot = useTransform(smoothProgress, [0.3, 0.6], [0, 90]);

    // State 3: Service focus (Floating up)
    const t3_y = useTransform(smoothProgress, [0.6, 1], [0, -300]);

    const tools = [
        { Icon: Wrench, color: "text-white", style: { top: "20%", left: "15%", x: t1_x, y: t1_y } },
        { Icon: Zap, color: "text-energy", style: { top: "15%", right: "20%", x: useTransform(smoothProgress, [0, 1], [0, 100]), rotate: t2_rot } },
        { Icon: Plug, color: "text-electric", style: { bottom: "30%", left: "20%", y: t3_y } },
        { Icon: Activity, color: "text-white", style: { bottom: "25%", right: "25%", x: t2_x, y: t2_y } },
        { Icon: Cable, color: "text-accent", style: { top: "40%", left: "50%", scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 0.5]) } },
    ];

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0F1922]">

                {/* --- 1. Dynamic Backgrounds Layers --- */}
                <motion.div style={{ opacity: bgGradient1 }} className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] via-[#1A2847] to-[#0F1922] z-0" />
                <motion.div style={{ opacity: bgGradient2 }} className="absolute inset-0 bg-gradient-to-bl from-[#1A2847] via-[#0F1922] to-[#004a5c] z-0" />
                <motion.div style={{ opacity: bgGradient3 }} className="absolute inset-0 bg-gradient-to-tr from-[#2a120a] via-[#1A2847] to-[#0F1922] z-0" />

                {/* Shared Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none z-0" />

                {/* --- 2. Floating Tools (Consistent across scroll but moving) --- */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {tools.map((t, i) => (
                        <motion.div
                            key={i}
                            className={`absolute ${t.color} opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                            style={t.style}
                        >
                            <t.Icon size={100} strokeWidth={1} />
                        </motion.div>
                    ))}
                </div>

                {/* --- 3. Content Stages --- */}

                {/* STAGE 1: Solutions */}
                <motion.div
                    style={{ opacity: opacity1, scale: scale1 }}
                    className="absolute z-20 text-center px-4 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-electric/30 bg-electric/10 text-electric font-mono text-sm mb-6 tracking-widest uppercase">
                        Ingeniería y Distribución
                    </div>
                    <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight leading-none mb-6 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        SOLUCIONES<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-white">ELÉCTRICAS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                        Potencia, seguridad y eficiencia para proyectos industriales de alto nivel.
                    </p>
                </motion.div>

                {/* STAGE 2: Products */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute z-20 text-center px-4 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-sm mb-6 tracking-widest uppercase">
                        Catálogo Certificado
                    </div>
                    <h2 className="text-7xl md:text-9xl font-bold text-white tracking-tight leading-none mb-6">
                        MATERIALES<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">PREMIUM</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                        Stock permanente de las marcas líderes mundiales.
                    </p>
                </motion.div>

                {/* STAGE 3: Service */}
                <motion.div
                    style={{ opacity: opacity3, scale: scale3 }}
                    className="absolute z-20 text-center px-4 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-energy/30 bg-energy/10 text-energy font-mono text-sm mb-6 tracking-widest uppercase">
                        Soporte Experto 24/7
                    </div>
                    <h2 className="text-7xl md:text-9xl font-bold text-white tracking-tight leading-none mb-6">
                        SERVICIO<br />
                        DISEÑADO PARA <span className="text-energy">TI</span>
                    </h2>
                    <motion.a
                        href="#quote"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-10 py-5 bg-energy text-white font-bold text-xl rounded-full shadow-[0_0_30px_rgba(255,107,53,0.4)] hover:shadow-[0_0_50px_rgba(255,107,53,0.6)] transition-all mt-8"
                    >
                        Solicitar Asesoría
                    </motion.a>
                </motion.div>


                {/* --- 4. Progression Indicators --- */}
                {/* Right Side Dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                    <motion.div style={{ opacity: opacity1 }} className="w-3 h-3 bg-electric rounded-full shadow-[0_0_8px_cyan]" />
                    <motion.div style={{ opacity: opacity2 }} className="w-3 h-3 bg-accent rounded-full shadow-[0_0_8px_#C5E0D8]" />
                    <motion.div style={{ opacity: opacity3 }} className="w-3 h-3 bg-energy rounded-full shadow-[0_0_8px_orange]" />
                </div>

                {/* Scroll hint (fades out at end) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
                >
                    <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                        <motion.div
                            animate={{ y: [-48, 48] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1/2 bg-white"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
