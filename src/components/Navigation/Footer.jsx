import React from 'react';
import { Zap, Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                            <Zap className="fill-primary" /> Punto Electro
                        </div>
                        <p className="text-gray-500 leading-relaxed">
                            Liderando la innovación en distribución de materiales eléctricos y soluciones técnicas para la industria moderna.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Navegación</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#hero" className="hover:text-primary transition-colors">Inicio</a></li>
                            <li><a href="#products" className="hover:text-primary transition-colors">Catálogo</a></li>
                            <li><a href="#quote" className="hover:text-primary transition-colors">Cotizar</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Servicios</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Asesoría Técnica</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Proyectos Industriales</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instalaciones</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Mantenimiento</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contacto</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary mt-1 shrink-0" size={18} />
                                <span>Av. Libertador 1234, Ciudad Empresarial, Santiago</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary shrink-0" size={18} />
                                <span>+56 2 2345 6789</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary shrink-0" size={18} />
                                <span>contacto@puntoelectro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; 2024 Punto Electro. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary">Términos</a>
                        <a href="#" className="hover:text-primary">Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
