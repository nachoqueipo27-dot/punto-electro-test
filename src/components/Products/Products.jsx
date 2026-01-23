import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cable, Zap, ToggleLeft, Plug, Grid, Hammer, ArrowRight } from 'lucide-react';

const categories = ["Todos", "Industrial", "Residencial", "Herramientas"];

const products = [
    { id: 1, name: "Cables Conductores", category: "Industrial", desc: "Cobre de alta pureza 99.9%.", icon: Cable, color: "text-primary", badge: "Best Seller" },
    { id: 2, name: "Breakers DIN", category: "Residencial", desc: "Protección termomagnética.", icon: Zap, color: "text-cta", badge: "Nuevo" },
    { id: 3, name: "Smart Home", category: "Residencial", desc: "Control IoT avanzado.", icon: ToggleLeft, color: "text-accent", badge: null },
    { id: 4, name: "Tomas Industriales", category: "Industrial", desc: "IP67 Heavy Duty.", icon: Plug, color: "text-secondary", badge: "Stock Alto" },
    { id: 5, name: "Tableros TDA", category: "Industrial", desc: "Certificación SEC.", icon: Grid, color: "text-primary", badge: null },
    { id: 6, name: "Kits de Instalación", category: "Herramientas", desc: "Profesional Grade.", icon: Hammer, color: "text-cta", badge: "Promo" },
];

const TiltCard = ({ product }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]); // Reduced tilt for professionalism
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-white rounded-lg p-8 border border-border shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 perspective-1000 transform-gpu cursor-pointer"
        >
            {/* 3D Content Container */}
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-0 right-0 bg-light text-primary border border-border text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        {product.badge}
                    </span>
                )}

                {/* Icon Layer */}
                <div className={`w-14 h-14 rounded-lg bg-light flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative z-10`}>
                    <product.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-6 border-b border-gray-100 pb-4 leading-relaxed">{product.desc}</p>

                <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{product.category}</span>
                    <button className="w-8 h-8 rounded-full bg-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Products = () => {
    const [filter, setFilter] = useState("Todos");
    const filteredProducts = filter === "Todos" ? products : products.filter(p => p.category === filter);

    return (
        <section id="products" className="py-24 bg-light relative perspective-2000">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <span className="text-accent font-bold tracking-wide uppercase text-sm mb-2 block">Catálogo 2026</span>
                        <h2 className="text-4xl font-bold text-dark">Soluciones Integrales</h2>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-md font-medium text-sm transition-all duration-200 border ${filter === cat ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-border hover:border-primary hover:text-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <TiltCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
