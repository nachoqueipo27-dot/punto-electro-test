import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ArrowRight, Loader2, User, Mail, FileText } from 'lucide-react';

const QuoteSection = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    return (
        <section id="quote" className="relative py-32 bg-darkBg overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-energy/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-electric font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
                        >
                            Comienza Ahora
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
                        >
                            ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-white">impulsar</span> tu proyecto?
                        </motion.h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Obtén una cotización detallada en menos de 24 horas. Nuestro equipo técnico analiza tus requerimientos para ofrecer la mejor solución costo-efectiva.
                        </p>

                        <div className="flex gap-8 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1">24h</h4>
                                <span className="text-sm text-gray-500">Tiempo de Respuesta</span>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
                                <span className="text-sm text-gray-500">Asesoría Técnica</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-3xl shadow-2xl relative">
                        <div className="bg-[#1A2847] rounded-2xl p-8 md:p-10 relative overflow-hidden">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                        <CheckCircle2 size={40} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                                    <p className="text-gray-400">Un especialista te contactará pronto.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-bold text-white">Detalles del Proyecto</h3>
                                        <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-electric font-mono">SECURE FORM</span>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-electric transition-colors" size={20} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Nombre Completo"
                                                className="w-full bg-[#0F1922] border border-white/10 rounded-xl px-12 py-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600"
                                            />
                                            {/* Validation visual */}
                                            <div className="absolute right-4 top-4 w-2 h-2 rounded-full bg-green-500 opacity-0 group-focus-within:opacity-100 transition-opacity shadow-[0_0_8px_limegreen]"></div>
                                        </div>

                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-electric transition-colors" size={20} />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Correo Corporativo"
                                                className="w-full bg-[#0F1922] border border-white/10 rounded-xl px-12 py-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <FileText className="absolute left-4 top-4 text-gray-500 group-focus-within:text-electric transition-colors" size={20} />
                                            <textarea
                                                required
                                                rows="3"
                                                placeholder="Descripción del requerimiento..."
                                                className="w-full bg-[#0F1922] border border-white/10 rounded-xl px-12 py-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={loading}
                                        className="w-full bg-energy hover:bg-[#FF5520] text-white font-bold text-lg py-5 rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(255,107,53,0.3)] transition-all transform hover:-translate-y-1 mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <>Solicitar Cotización <ArrowRight size={20} /></>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;
