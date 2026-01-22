import React from 'react';
import { motion } from 'framer-motion';
import { Cable, Zap, ToggleLeft, Plug, Grid, Hammer, ArrowRight } from 'lucide-react';

const products = [
    { id: 1, name: "Cables Conductores", desc: "Cobre de alta pureza para máxima conductividad y seguridad.", icon: Cable, color: "bg-blue-50 text-blue-600" },
    { id: 2, name: "Breakers y Protección", desc: "Interruptores termomagnéticos de respuesta rápida.", icon: Zap, color: "bg-red-50 text-red-600" },
    { id: 3, name: "Interruptores Smart", desc: "Automatización y control remoto para hogares inteligentes.", icon: ToggleLeft, color: "bg-purple-50 text-purple-600" },
    { id: 4, name: "Enchufes Industriales", desc: "Conectores robustos para entornos exigentes.", icon: Plug, color: "bg-orange-50 text-orange-600" },
    { id: 5, name: "Tableros de Distribución", desc: "Organización y protección centralizada de circuitos.", icon: Grid, color: "bg-slate-50 text-slate-600" },
    { id: 6, name: "Ferretería Eléctrica", desc: "Herramientas e insumos para instalación profesional.", icon: Hammer, color: "bg-green-50 text-green-600" },
];

const Products = () => {
    return (
        <section id="products" className="py-32 bg-secondary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-7xl font-bold text-primary mb-6 tracking-tight">Catálogo Premium</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Descubre nuestra selección de materiales de alta gama garantizados para proyectos de cualquier escala.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                            className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/20 transition-all duration-300 group cursor-pointer shadow-sm"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <product.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">{product.desc}</p>
                            <div className="flex items-center text-primary font-medium group/btn">
                                <span className="mr-2">Ver detalles</span>
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
