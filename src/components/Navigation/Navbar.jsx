import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);

        // Simple scroll spy logic
        const height = window.innerHeight;
        if (latest < height * 0.8) setActiveSection('hero');
        else if (latest < height * 2.5) setActiveSection('products');
        else setActiveSection('quote');
    });

    const navLinks = [
        { id: 'hero', label: 'Inicio', href: '#hero' },
        { id: 'products', label: 'Productos', href: '#products' },
        { id: 'quote', label: 'Cotizar', href: '#quote', isButton: true },
    ];

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
                <div className="hidden md:flex items-center space-x-8 font-medium">
                    {navLinks.map((link) => (
                        link.isButton ? (
                            <a
                                key={link.id}
                                href={link.href}
                                className="px-5 py-2 rounded-md bg-white/10 text-white hover:bg-energy hover:text-white transition-all duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <div className="absolute inset-0 bg-energy transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </a>
                        ) : (
                            <a
                                key={link.id}
                                href={link.href}
                                className={`relative text-sm uppercase tracking-wide transition-colors ${activeSection === link.id ? 'text-electric' : 'text-gray-300 hover:text-white'}`}
                            >
                                {link.label}
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-electric shadow-[0_0_8px_cyan]"
                                    />
                                )}
                            </a>
                        )
                    ))}
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-secondary shadow-xl md:hidden border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            {navLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className={`px-4 py-3 rounded-lg transition-colors ${activeSection === link.id ? 'bg-white/5 text-electric' : 'text-gray-300 hover:text-white hover:bg-white/5'} ${link.isButton ? 'text-energy font-bold' : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
