import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingCTA = () => {
    const [visible, setVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setVisible(latest > 500); // Show after Hero
    });

    return (
        <AnimatePresence>
            {visible && (
                <motion.a
                    href="#quote"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-40 bg-energy w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] transition-shadow cursor-pointer border-2 border-white/10"
                >
                    <MessageCircle size={28} />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default FloatingCTA;
