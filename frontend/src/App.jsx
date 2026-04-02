import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { tmdbService } from './api/tmdbService';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import { FAB } from './components/Ui';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export function App() {
  const [popular, setPopular] = useState(null);
  const [onAir, setOnAir] = useState(null);
  const [suspense, setSuspense] = useState(null);
  const [mystery, setMystery] = useState(null);
  const [gourmet, setGourmet] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          popularRes,
          onAirRes,
          suspenseRes,
          mysteryRes,
          gourmetRes
        ] = await Promise.all([
          tmdbService.getPopular(),
          tmdbService.getOnAir(),
          tmdbService.getSuspense(),
          tmdbService.getMystery(),
          tmdbService.getGourmet()
        ]);

        setPopular(popularRes.results || []);
        setOnAir(onAirRes.results || []);
        setSuspense(suspenseRes.results || []);
        setMystery(mysteryRes.results || []);
        
        // gourmetRes is an array of data objects because of the axios interceptor
        setGourmet(gourmetRes || []);

      } catch (error) {
        console.error('Failed to fetch TMDB data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ popular, onAir, suspense, mystery, gourmet }} />
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
