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
        <section id="quote" className="relative py-24 bg-darkBg overflow-hidden">
            {/* Background Elements - SUBTLE professional gradients, NO blobs */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#001E2E] z-0" />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-accent font-bold tracking-wide uppercase text-sm mb-2 block">Cotización Express</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Comencemos tu Proyecto</h2>
                </div>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden relative">

                    {/* Progress Bar - Clean */}
                    <div className="bg-light p-6 border-b border-border">
                        <div className="flex justify-between items-center relative z-10">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex flex-col items-center flex-1">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {step > s.id ? <Check size={16} /> : s.id}
                                    </div>
                                    <span className={`mt-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${step >= s.id ? 'text-primary' : 'text-gray-400'}`}>{s.title}</span>
                                </div>
                            ))}
                        </div>
                        {/* Connecting Line - Clean */}
                        <div className="absolute top-[40px] left-0 w-full h-[1px] bg-gray-200 -z-0">
                            <motion.div
                                className="h-full bg-primary"
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
                                    <div className="w-20 h-20 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-dark mb-2">¡Solicitud Enviada!</h3>
                                    <p className="text-secondary text-lg max-w-md">Tu requerimiento ha sido asignado con prioridad. Te contactaremos en breve.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
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
                                                    className={`p-6 rounded-lg border-2 text-left hover:bg-light transition-all group ${formData.type === type ? 'border-primary bg-primary/5' : 'border-border'}`}
                                                >
                                                    <span className={`block text-lg font-bold mb-1 group-hover:text-primary ${formData.type === type ? 'text-primary' : 'text-dark'}`}>{type}</span>
                                                    <span className="text-gray-500 text-sm">Seleccionar esta categoría</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* STEP 2: Personal Data */}
                                    {step === 2 && (
                                        <div className="space-y-6 my-auto">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Nombre Completo</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => updateForm('name', e.target.value)}
                                                        type="text"
                                                        className="w-full bg-light border border-border rounded-lg pl-12 pr-4 py-3 text-dark focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                                        placeholder="Ej: Juan Pérez"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Email Corporativo</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => updateForm('email', e.target.value)}
                                                        type="email"
                                                        className="w-full bg-light border border-border rounded-lg pl-12 pr-4 py-3 text-dark focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
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
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wide">Descripción del Requerimiento</label>
                                                <textarea
                                                    required
                                                    value={formData.details}
                                                    onChange={(e) => updateForm('details', e.target.value)}
                                                    rows="5"
                                                    className="w-full bg-light border border-border rounded-lg p-4 text-dark focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                                                    placeholder="Describe los productos o servicios que necesitas..."
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-between mt-8 pt-6 border-t border-border">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="flex items-center text-gray-500 hover:text-primary transition-colors font-medium"
                                            >
                                                <ChevronLeft size={20} /> Atrás
                                            </button>
                                        )}

                                        {step < 3 ? (
                                            step > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="ml-auto bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                                                >
                                                    Continuar <ChevronRight size={20} />
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="ml-auto bg-cta text-white font-semibold px-10 py-3 rounded-lg hover:bg-[#c24b1f] transition-all flex items-center gap-2 shadow-sm"
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
