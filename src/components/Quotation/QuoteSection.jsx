import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const QuoteSection = () => {
    return (
        <section id="quote" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1A2847] via-[#0F1922] to-[#00051F]">
            {/* Dramatic Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00D4FF_0%,transparent_70%)] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.02)_20px,rgba(255,255,255,0.02)_21px)] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-0 shadow-2xl rounded-3xl overflow-hidden">

                    {/* Left Info Panel */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-electric via-blue-500 to-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">Inicia tu Proyecto</h3>
                            <p className="text-blue-100 mb-8 leading-relaxed">Nuestros ingenieros especialistas están listos para asesorarte con la mejor solución técnica y económica.</p>

                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex items-center gap-3"><span className="w-8 h-[1px] bg-white/50"></span> Asesoría Gratuita</div>
                                <div className="flex items-center gap-3"><span className="w-8 h-[1px] bg-white/50"></span> Stock Permanente</div>
                                <div className="flex items-center gap-3"><span className="w-8 h-[1px] bg-white/50"></span> Envíos a todo el país</div>
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    {/* Form Panel */}
                    <div className="lg:col-span-3 bg-white p-10 md:p-12">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-light border-b-2 border-transparent focus:border-energy focus:bg-white outline-none transition-all duration-300 font-medium text-primary"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg bg-light border-b-2 border-transparent focus:border-energy focus:bg-white outline-none transition-all duration-300 font-medium text-primary"
                                        placeholder="correo@empresa.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Detalles del Requerimiento</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg bg-light border-b-2 border-transparent focus:border-energy focus:bg-white outline-none transition-all duration-300 resize-none font-medium text-primary"
                                    placeholder="Describe los materiales o servicios que necesitas..."
                                ></textarea>
                            </div>

                            <button className="w-full py-4 bg-primary text-white font-bold text-lg rounded-lg hover:bg-secondary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 border border-white/10">
                                Enviar Consulta
                                <Send size={18} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default QuoteSection;
