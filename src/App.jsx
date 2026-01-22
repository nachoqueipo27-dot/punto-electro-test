import React from 'react';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import Products from './components/Products/Products';
import QuoteSection from './components/Quotation/QuoteSection';
import Footer from './components/Navigation/Footer';

function App() {
  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <QuoteSection />
      <Footer />
    </div>
  );
}

export default App;
