import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Gallery from '@/components/Gallery';
import Donate from '@/components/Donate';
import AppPromotion from '@/components/AppPromotion';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Mission />
      <Gallery />
      <Donate />
      <AppPromotion />
      <Footer />
    </main>
  );
} 