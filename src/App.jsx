import React from 'react';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import TrustSection from './components/Trust/TrustSection';
import Products from './components/Products/Products';
import QuoteSection from './components/Quotation/QuoteSection';
import Footer from './components/Navigation/Footer';
import ScrollProgress from './components/UI/ScrollProgress';
import FloatingCTA from './components/UI/FloatingCTA';

function App() {
  return (
    <div className="bg-secondary min-h-screen font-sans selection:bg-electric selection:text-primary">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Products />
      <TrustSection />
      <QuoteSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;
