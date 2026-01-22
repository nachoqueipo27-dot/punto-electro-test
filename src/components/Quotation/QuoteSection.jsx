import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const QuoteSection = () => {
    return (
        <section id="quote" className="relative py-32 overflow-hidden bg-white">
            {/* Animated Background Gradient */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Inicie su Proyecto</h2>
                            <p className="text-gray-500 text-lg">Déjenos sus datos y un especialista le contactará en menos de 24 horas.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                                        placeholder="Su nombre completo"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                                        placeholder="correo@empresa.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                                        placeholder="+54 11 ..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Empresa (Opcional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                                        placeholder="Nombre de su organización"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Detalles del Proyecto</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none"
                                    placeholder="Describa brevemente los materiales o servicios que necesita..."
                                ></textarea>
                            </div>

                            <button className="group w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-[#2a4475] transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                                Enviar Solicitud
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;
