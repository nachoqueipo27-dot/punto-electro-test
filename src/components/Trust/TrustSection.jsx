import React from 'react';
import { motion, animate } from 'framer-motion';
import { Star, ShieldCheck, Clock, Users } from 'lucide-react';

const stats = [
    { id: 1, value: "+15", label: "Años de Experiencia", icon: Clock },
    { id: 2, value: "+2.5k", label: "Proyectos Ejecutados", icon: ShieldCheck },
    { id: 3, value: "+500", label: "Clientes Corporativos", icon: Users },
];

const testimonials = [
    { id: 1, name: "Constructora Andes", text: "Proveedor estratégico clave. Cumplimiento impecable en tiempos y calidad técnica.", role: "Gerencia de Proyectos" },
    { id: 2, name: "Ingeniería Industrial SA", text: "Soporte técnico de otro nivel. Nos ayudaron a optimizar costos sin sacrificar seguridad.", role: "Jefe de Planta" },
    { id: 3, name: "Desarrollos Urbanos", text: "La disponibilidad de stock y logística rápida nos permite mantener el ritmo de obra.", role: "Adquisiciones" },
];

// Animated Counter Component
const Counter = ({ value, label, icon: Icon }) => {
    // Extract numerical part and suffix
    const numericPart = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.includes('k') ? 'k' : value.includes('+') ? '+' : '';
    const prefix = value.startsWith('+') ? '+' : '';

    const nodeRef = React.useRef();

    React.useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(0, numericPart, {
            duration: 2.5,
            ease: "circOut",
            onUpdate(val) {
                if (node) node.textContent = Math.round(val);
            }
        });
        return () => controls.stop();
    }, [numericPart]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-light transition-colors duration-300"
        >
            <div className="p-4 bg-white border border-border rounded-full mb-4 text-primary shadow-sm">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-4xl font-bold text-dark mb-2 font-sans tracking-tight">
                {prefix}<span ref={nodeRef}>0</span>{suffix}
            </h3>
            <p className="text-secondary/80 font-medium text-sm">{label}</p>
        </motion.div>
    );
};

const TrustSection = () => {
    return (
        <section className="py-24 bg-white border-y border-border">
            <div className="container mx-auto px-6 lg:px-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-b border-border pb-16">
                    {stats.map((stat) => (
                        <Counter key={stat.id} {...stat} />
                    ))}
                </div>

                {/* Testimonials */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-dark">Confianza que Construye</h2>
                    <p className="text-secondary/70 max-w-2xl mx-auto">Excelencia respaldada por quienes lideran la industria.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-light p-8 rounded-lg border border-border relative hover:border-accent/40 transition-all duration-300"
                        >
                            <div className="flex gap-1 text-[#F59E0B] mb-4">  {/* Standard Yellow/Orange for stars */}
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <p className="text-secondary mb-6 italic leading-relaxed text-sm">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center font-bold text-xs">
                                    {t.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-dark text-sm">{t.name}</h4>
                                    <p className="text-xs text-secondary/60">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
