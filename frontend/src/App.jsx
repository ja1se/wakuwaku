import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { tmdbService } from './api/tmdbService';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import { FAB } from './components/Ui';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [popular, setPopular] = useState(null);
  const [onAir, setOnAir] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [suspense, setSuspense] = useState(null);
  const [career, setCareer] = useState(null);
  const [gourmet, setGourmet] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          popularRes,
          onAirRes,
          topRatedRes,
          suspenseRes,
          careerRes,
          gourmetRes
        ] = await Promise.all([
          tmdbService.getPopular(),
          tmdbService.getOnAir(),
          tmdbService.getTopRated(),
          tmdbService.getSuspense(),
          tmdbService.getCareer(),
          tmdbService.getGourmet()
        ]);

        setPopular(popularRes.results || []);
        setOnAir(onAirRes.results || []);
        setTopRated(topRatedRes.results || []);
        setSuspense(suspenseRes.results || []);
        setCareer(careerRes || []);
        setGourmet(gourmetRes || []);

      } catch (error) {
        console.error('Failed to fetch TMDB data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ popular, onAir, topRated, suspense, career, gourmet, loading }} />
      </main>
      <Footer />

      {/* Chatbot Toggle Button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <FAB icon={faMessage} onClick={() => setIsChatOpen(true)} />
        </div>
      )}

      {/* Chatbot Window */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
