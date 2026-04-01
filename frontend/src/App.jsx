import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Nav from './components/Nav'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot/Chatbot'
import { FAB } from './components/Ui'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drama/:id" element={<MovieDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />

      {/* Chatbot Toggle Button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-[90]">
          <FAB icon={faMessage} onClick={() => setIsChatOpen(true)} />
        </div>
      )}

      {/* Chatbot Window */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </BrowserRouter>
  )
}
