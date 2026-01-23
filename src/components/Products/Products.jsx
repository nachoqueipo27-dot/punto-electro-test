import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cable, Zap, ToggleLeft, Plug, Grid, Hammer, ArrowRight, Filter } from 'lucide-react';

const categories = ["Todos", "Industrial", "Residencial", "Herramientas"];

const products = [
    { id: 1, name: "Cables Conductores", category: "Industrial", desc: "Cobre de alta pureza 99.9%.", icon: Cable, color: "text-electric", badge: "Best Seller" },
    { id: 2, name: "Breakers DIN", category: "Residencial", desc: "Protección termomagnética.", icon: Zap, color: "text-energy", badge: "Nuevo" },
    { id: 3, name: "Smart Home", category: "Residencial", desc: "Control IoT avanzado.", icon: ToggleLeft, color: "text-accent", badge: null },
    { id: 4, name: "Tomas Industriales", category: "Industrial", desc: "IP67 Heavy Duty.", icon: Plug, color: "text-white", badge: "Stock Alto" },
    { id: 5, name: "Tableros TDA", category: "Industrial", desc: "Certificación SEC.", icon: Grid, color: "text-electric", badge: null },
    { id: 6, name: "Kits de Instalación", category: "Herramientas", desc: "Profesional Grade.", icon: Hammer, color: "text-energy", badge: "Promo" },
];

const Products = () => {
    const [filter, setFilter] = useState("Todos");
    const [hovered, setHovered] = useState(null);

    const filteredProducts = filter === "Todos" ? products : products.filter(p => p.category === filter);

    return (
        <section id="products" className="py-32 bg-light relative">
            <div className="container mx-auto px-6 relative z-10">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="text-energy font-bold tracking-widest uppercase text-sm mb-2 block">Catálogo 2026</span>
                        <h2 className="text-5xl font-bold text-primary">Soluciones Integrales</h2>
                    </div>

                    <div className="flex gap-2 flex-wrap bg-white p-1 rounded-lg shadow-sm">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 ${filter === cat ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onHoverStart={() => setHovered(product.id)}
                                onHoverEnd={() => setHovered(null)}
                                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 perspective-1000 transform-gpu"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                                        {product.badge}
                                    </span>
                                )}

                                {/* Icon Layer */}
                                <div className="w-16 h-16 rounded-2xl bg-darkBg text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:bg-energy transition-all duration-300 relative z-10">
                                    <product.icon size={32} className="group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-energy transition-colors">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 border-b border-gray-100 pb-4">{product.desc}</p>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
                                    <button className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>

                                {/* Floating Effect Shadow overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
