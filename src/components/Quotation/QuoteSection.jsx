import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Send, CheckCircle2, User, Mail, Briefcase, FileText } from 'lucide-react';

const QuoteSection = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        email: '',
        details: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const updateForm = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    const steps = [
        { id: 1, title: "Tipo de Proyecto", icon: Briefcase },
        { id: 2, title: "Tus Datos", icon: User },
        { id: 3, title: "Detalles", icon: FileText },
    ];

    return (
        <section id="quote" className="relative py-32 bg-darkBg overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-energy/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-electric font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Cotización Express</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Comencemos tu Proyecto</h2>
                </div>

                <div className="bg-[#1A2847] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">

                    {/* Progress Bar */}
                    <div className="bg-black/20 p-6 md:p-8 border-b border-white/5">
                        <div className="flex justify-between items-center relative z-10">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= s.id ? 'bg-energy text-white shadow-lg scale-110' : 'bg-white/10 text-gray-500'}`}>
                                        {step > s.id ? <Check size={20} /> : s.id}
                                    </div>
                                    <span className={`mt-2 text-xs font-medium uppercase tracking-wide transition-colors duration-500 ${step >= s.id ? 'text-white' : 'text-gray-600'}`}>{s.title}</span>
                                </div>
                            ))}
                        </div>
                        {/* Connecting Line */}
                        <div className="absolute top-[48px] md:top-[56px] left-0 w-full h-[2px] bg-white/5 -z-0">
                            <motion.div
                                className="h-full bg-energy"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8 md:p-12 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center h-full py-10"
                                >
                                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                                        <CheckCircle2 size={48} className="text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">¡Solicitud Exitosa!</h3>
                                    <p className="text-gray-400 text-lg max-w-md">Tu requerimiento ha sido asignado con prioridad. Te contactaremos en breve.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                    className="h-full flex flex-col"
                                >
                                    {/* STEP 1: Project Type */}
                                    {step === 1 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
                                            {['Industrial', 'Residencial', 'Comercial', 'Otro'].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => { updateForm('type', type); nextStep(); }}
                                                    className={`p-6 rounded-xl border-2 text-left hover:bg-white/5 transition-all group ${formData.type === type ? 'border-energy bg-energy/10' : 'border-white/10'}`}
                                                >
                                                    <span className={`block text-xl font-bold mb-2 group-hover:text-energy ${formData.type === type ? 'text-energy' : 'text-white'}`}>{type}</span>
                                                    <span className="text-gray-400 text-sm">Seleccionar esta categoría</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* STEP 2: Personal Data */}
                                    {step === 2 && (
                                        <div className="space-y-6 my-auto">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Nombre Completo</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                                    <input
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => updateForm('name', e.target.value)}
                                                        type="text"
                                                        className="w-full bg-darkBg border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-energy focus:ring-1 focus:ring-energy/50 outline-none transition-all placeholder:text-gray-700"
                                                        placeholder="Ej: Juan Pérez"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Corporativo</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                                    <input
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => updateForm('email', e.target.value)}
                                                        type="email"
                                                        className="w-full bg-darkBg border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-energy focus:ring-1 focus:ring-energy/50 outline-none transition-all placeholder:text-gray-700"
                                                        placeholder="ejemplo@empresa.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: Details */}
                                    {step === 3 && (
                                        <div className="space-y-6 my-auto">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Descripción del Requerimiento</label>
                                                <textarea
                                                    required
                                                    value={formData.details}
                                                    onChange={(e) => updateForm('details', e.target.value)}
                                                    rows="5"
                                                    className="w-full bg-darkBg border border-white/10 rounded-xl p-4 text-white focus:border-energy focus:ring-1 focus:ring-energy/50 outline-none transition-all placeholder:text-gray-700 resize-none"
                                                    placeholder="Describe los productos o servicios que necesitas..."
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="flex items-center text-gray-400 hover:text-white transition-colors"
                                            >
                                                <ChevronLeft size={20} /> Atrás
                                            </button>
                                        )}

                                        {step < 3 ? (
                                            step > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="ml-auto bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
                                                >
                                                    Continuar <ChevronRight size={20} />
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="ml-auto bg-energy text-white font-bold px-10 py-3 rounded-xl hover:bg-[#FF5520] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                                            >
                                                {loading ? "Enviando..." : <>Enviar Solicitud <Send size={20} /></>}
                                            </button>
                                        )}
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default QuoteSection;
