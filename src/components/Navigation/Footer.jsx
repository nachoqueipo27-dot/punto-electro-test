import React from 'react';
import { Zap, Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-darkBg text-white pt-20 pb-10 border-t border-white/5 font-sans relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-2xl">
                            <div className="bg-electric p-1.5 rounded text-primary">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            Punto Electro
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Potenciando la industria con soluciones eléctricas de vanguardia. Distribución certificada y soporte técnico especializado.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-electric hover:text-primary transition-all duration-300"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-electric hover:text-primary transition-all duration-300"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-electric hover:text-primary transition-all duration-300"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm border-b border-electric/30 inline-block pb-1">Navegación</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#hero" className="hover:text-electric transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /> Inicio</a></li>
                            <li><a href="#products" className="hover:text-electric transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /> Catálogo</a></li>
                            <li><a href="#quote" className="hover:text-electric transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /> Cotizar</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm border-b border-electric/30 inline-block pb-1">Servicios</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-electric cursor-pointer transition-colors">Ingeniería Eléctrica</li>
                            <li className="hover:text-electric cursor-pointer transition-colors">Tableros a Medida</li>
                            <li className="hover:text-electric cursor-pointer transition-colors">Domótica Industrial</li>
                            <li className="hover:text-electric cursor-pointer transition-colors">Certificación SEC</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm border-b border-electric/30 inline-block pb-1">Contacto</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3 group cursor-pointer hover:text-white transition-colors">
                                <MapPin className="text-electric mt-0.5 shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all" size={16} />
                                <span>Parque Industrial Eje Norte,<br />Av. La Montaña 775, Santiago</span>
                            </li>
                            <li className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                                <Phone className="text-electric shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all" size={16} />
                                <span>+56 2 2555 9090</span>
                            </li>
                            <li className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                                <Mail className="text-electric shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all" size={16} />
                                <span>ventas@puntoelectro.cl</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; 2026 Punto Electro Ingeniería y Servicios. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-electric transition-colors">Términos y Condiciones</a>
                        <a href="#" className="hover:text-electric transition-colors">Política de Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
