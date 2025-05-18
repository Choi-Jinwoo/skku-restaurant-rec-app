import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from './pages/main/index.page';
import UserPage from './pages/user/index.page';
import ReviewPage from './pages/review/index.page';
import EtcPage from './pages/etc/index.page';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/etc" element={<EtcPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
