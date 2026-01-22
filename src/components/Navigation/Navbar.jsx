import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="bg-electric p-2 rounded-lg text-primary group-hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all duration-300">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white group-hover:text-electric transition-colors duration-300">
                        Punto Electro
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 font-medium">
                    <a href="#hero" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-electric pb-1 transition-all">Inicio</a>
                    <a href="#products" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-electric pb-1 transition-all">Productos</a>
                    <a href="#quote" className="px-5 py-2 rounded-md bg-white/10 text-white hover:bg-energy hover:text-white transition-all duration-300">Cotizar</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-electric transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-full bg-secondary shadow-xl md:hidden border-t border-white/10"
                >
                    <div className="flex flex-col p-4 space-y-2">
                        <a href="#hero" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Inicio</a>
                        <a href="#products" className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Productos</a>
                        <a href="#quote" className="text-energy font-bold hover:bg-white/5 px-4 py-3 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Cotizar</a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
