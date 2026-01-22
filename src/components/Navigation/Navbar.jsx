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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <span className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>
                        Punto Electro
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className={`hidden md:flex space-x-8 font-medium transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
                    <a href="#hero" className="hover:text-primary transition-colors">Inicio</a>
                    <a href="#products" className="hover:text-primary transition-colors">Productos</a>
                    <a href="#quote" className="hover:text-primary transition-colors">Cotizar</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} /> : <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden p-4 flex flex-col space-y-4"
                >
                    <a href="#hero" className="text-gray-800 font-medium hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>Inicio</a>
                    <a href="#products" className="text-gray-800 font-medium hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>Productos</a>
                    <a href="#quote" className="text-gray-800 font-medium hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>Cotizar</a>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
