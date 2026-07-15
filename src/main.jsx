import "@fontsource/inter";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./global.css";
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App />
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: 2000,
      style: {
        background: "#18181b",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.1)",
      },
    }}
  />
</StrictMode>
)
