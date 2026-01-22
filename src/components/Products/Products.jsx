import React from 'react';
import { motion } from 'framer-motion';
import { Cable, Zap, ToggleLeft, Plug, Grid, Hammer, ArrowRight } from 'lucide-react';

const products = [
    { id: 1, name: "Cables Conductores", desc: "Cobre de alta pureza para máxima conductividad y seguridad.", icon: Cable, color: "text-primary" },
    { id: 2, name: "Breakers y Protección", desc: "Interruptores termomagnéticos de respuesta rápida.", icon: Zap, color: "text-energy" },
    { id: 3, name: "Interruptores Smart", desc: "Automatización y control remoto para hogares inteligentes.", icon: ToggleLeft, color: "text-electric" },
    { id: 4, name: "Enchufes Industriales", desc: "Conectores robustos para entornos exigentes.", icon: Plug, color: "text-secondary" },
    { id: 5, name: "Tableros de Distribución", desc: "Organización y protección centralizada de circuitos.", icon: Grid, color: "text-primary" },
    { id: 6, name: "Ferretería Eléctrica", desc: "Herramientas e insumos para instalación profesional.", icon: Hammer, color: "text-energy" },
];

const Products = () => {
    return (
        <section id="products" className="py-24 bg-light relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#1A2847_1px,transparent_1px)] [background-size:100px_100px] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-energy font-bold tracking-widest uppercase text-sm mb-2 block">Soluciones Integrales</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">Catálogo Premium</h2>
                    <p className="text-xl text-secondary/70 max-w-2xl mx-auto">
                        Materiales de alta especificación para proyectos residenciales e industriales que demandan lo mejor.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-b-4 hover:border-energy transition-all duration-300 group cursor-pointer border border-transparent"
                        >
                            <div className={`w-14 h-14 rounded-lg bg-light flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300`}>
                                <product.icon size={28} className={product.color} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-energy transition-colors">{product.name}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">{product.desc}</p>
                            <div className="flex items-center text-primary font-bold group/btn text-sm uppercase tracking-wide">
                                <span className="mr-2 border-b border-transparent group-hover/btn:border-primary transition-all">Ver Detalles</span>
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform text-energy" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
