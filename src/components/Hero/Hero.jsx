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

    // --- Dynamic Backgrounds (Professional Gradients) ---
    // Gradients updated to corporate professional tones
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
        { Icon: Zap, color: "text-cta", style: { top: "15%", right: "20%", x: useTransform(smoothProgress, [0, 1], [0, 100]), rotate: t2_rot } },
        { Icon: Plug, color: "text-accent", style: { bottom: "30%", left: "20%", y: t3_y } },
        { Icon: Activity, color: "text-white", style: { bottom: "25%", right: "25%", x: t2_x, y: t2_y } },
        { Icon: Cable, color: "text-accent", style: { top: "40%", left: "50%", scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 0.5]) } },
    ];

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-primary">

                {/* --- 1. Dynamic Backgrounds Layers (Professional) --- */}
                {/* Layer 1: Primary Corporate Blue */}
                <motion.div style={{ opacity: bgGradient1 }} className="absolute inset-0 bg-gradient-to-br from-primary via-[#002a40] to-[#001824] z-0" />
                {/* Layer 2: Secondary Gray-Blue Tint */}
                <motion.div style={{ opacity: bgGradient2 }} className="absolute inset-0 bg-gradient-to-bl from-secondary via-primary to-secondary z-0" />
                {/* Layer 3: Dark Corporate Tint */}
                <motion.div style={{ opacity: bgGradient3 }} className="absolute inset-0 bg-gradient-to-t from-dark via-primary to-primary z-0" />

                {/* Shared Background Pattern (Subtle grid) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

                {/* --- 2. Floating Tools (Consistent across scroll but moving) --- */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {tools.map((t, i) => (
                        <motion.div
                            key={i}
                            className={`absolute ${t.color} opacity-20`}
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
                    <div className="inline-block px-4 py-1 rounded bg-white/10 text-white font-medium text-sm mb-6 tracking-wide uppercase border border-white/10">
                        Ingeniería y Distribución
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
                        SOLUCIONES<br />
                        <span className="text-accent">ELÉCTRICAS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                        Potencia, seguridad y eficiencia para proyectos industriales de alto nivel.
                    </p>
                </motion.div>

                {/* STAGE 2: Products */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute z-20 text-center px-4 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1 rounded bg-white/10 text-white font-medium text-sm mb-6 tracking-wide uppercase border border-white/10">
                        Catálogo Certificado
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
                        MATERIALES<br />
                        <span className="text-white/90">PREMIUM</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
                        Stock permanente de las marcas líderes mundiales.
                    </p>
                </motion.div>

                {/* STAGE 3: Service */}
                <motion.div
                    style={{ opacity: opacity3, scale: scale3 }}
                    className="absolute z-20 text-center px-4 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1 rounded bg-white/10 text-white font-medium text-sm mb-6 tracking-wide uppercase border border-white/10">
                        Soporte Experto 24/7
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
                        SERVICIO<br />
                        DISEÑADO PARA <span className="text-cta">TI</span>
                    </h2>
                    <motion.a
                        href="#quote"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-10 py-4 bg-cta text-white font-bold text-lg rounded-lg shadow-sm hover:bg-[#c24b1f] transition-all mt-8"
                    >
                        Solicitar Asesoría
                    </motion.a>
                </motion.div>


                {/* --- 4. Progression Indicators --- */}
                {/* Right Side Dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                    <motion.div style={{ opacity: opacity1 }} className="w-2 h-2 bg-accent rounded-full" />
                    <motion.div style={{ opacity: opacity2 }} className="w-2 h-2 bg-white rounded-full" />
                    <motion.div style={{ opacity: opacity3 }} className="w-2 h-2 bg-cta rounded-full" />
                </div>

                {/* Scroll hint (fades out at end) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
                >
                    <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
                    <div className="w-[1px] h-10 bg-white/20 overflow-hidden">
                        <motion.div
                            animate={{ y: [-40, 40] }}
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
