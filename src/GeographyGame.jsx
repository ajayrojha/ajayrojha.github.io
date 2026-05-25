import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './GeographyGame.css';
import { Trophy, ArrowLeft, Earth, Compass, Navigation } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

// Expanded database of 18 countries with non-monument artifacts (food, animals, vehicles, flags)
const DATA = [
  {
    country: "France",
    artifact: "Croissant & Eiffel Tower",
    mode: "artifact",
    explanation: "Croissants are a staple of French bakeries, famous for their flaky, buttery layers! Originally inspired by Austrian pastries, they were perfected by French bakers in Paris and became a global symbol of French culinary art.",
    mapCoord: { x: 480, y: 145 },
    pathColor: "#3b82f6"
  },
  {
    country: "Egypt",
    artifact: "The Great Pyramids & Sphinx",
    mode: "artifact",
    explanation: "The Great Pyramids of Giza were built as tombs for ancient Pharaohs over 4,500 years ago! They are the oldest of the Seven Wonders of the Ancient World and still stand majestically in the desert.",
    mapCoord: { x: 520, y: 200 },
    pathColor: "#f59e0b"
  },
  {
    country: "Japan",
    artifact: "Sushi & Sakura Blossom",
    mode: "artifact",
    explanation: "Sushi originated as a way to preserve fish in fermented rice! Modern sushi became popular in Tokyo in the 1800s as a quick, delicious street food and has evolved into a global culinary masterpiece.",
    mapCoord: { x: 680, y: 175 },
    pathColor: "#ef4444"
  },
  {
    country: "India",
    artifact: "Taj Mahal & Pink Lotus",
    mode: "artifact",
    explanation: "The Lotus is the national flower of India, representing purity, beauty, and grace in ancient literature and art. India is also home to the Taj Mahal, a spectacular monument of white marble built in Agra.",
    mapCoord: { x: 600, y: 205 },
    pathColor: "#10b981"
  },
  {
    country: "Brazil",
    artifact: "Tropical Toucan & Palm Leaf",
    mode: "artifact",
    explanation: "The Toco Toucan is famous for its massive, colorful orange beak! It lives in the tropical rainforests and savannas of Brazil. Its bill looks heavy but is actually super light, made of honeycombed bone.",
    mapCoord: { x: 350, y: 320 },
    pathColor: "#10b981"
  },
  {
    country: "Australia",
    artifact: "Bounding Kangaroo",
    mode: "artifact",
    explanation: "Kangaroos are amazing marsupials native to Australia! They can't walk backwards, and their powerful legs allow them to jump up to 30 feet in a single bound, using their heavy tails for perfect balance.",
    mapCoord: { x: 720, y: 360 },
    pathColor: "#f59e0b"
  },
  {
    country: "China",
    artifact: "Giant Panda & Green Bamboo",
    mode: "artifact",
    explanation: "Giant Pandas are beloved symbols of peace and conservation! Native to the mountain bamboo forests of China, pandas spend up to 12 hours a day munching on bamboo shoots to stay full and happy.",
    mapCoord: { x: 640, y: 180 },
    pathColor: "#8b5cf6"
  },
  {
    country: "United States",
    artifact: "American Eagle & Statue of Liberty",
    mode: "artifact",
    explanation: "The Bald Eagle was chosen as the national bird of the United States in 1782, representing strength and freedom. The Statue of Liberty in New York Harbor stands as a universal icon of liberty.",
    mapCoord: { x: 220, y: 155 },
    pathColor: "#3b82f6"
  },
  {
    country: "Canada",
    artifact: "Red Maple Leaf & Beaver",
    mode: "artifact",
    explanation: "The bright red Maple Leaf is Canada's proudest national emblem! It has been used since the 1700s and represents the vast, gorgeous maple forests that turn brilliant colors every autumn.",
    mapCoord: { x: 210, y: 110 },
    pathColor: "#ef4444"
  },
  {
    country: "Mexico",
    artifact: "Gourmet Taco & Sombrero",
    mode: "artifact",
    explanation: "Tacos are a legendary Mexican culinary creation! Traditional tacos date back centuries, made from fresh corn tortillas filled with meats, cilantro, lime, and delicious spicy salsa.",
    mapCoord: { x: 200, y: 205 },
    pathColor: "#10b981"
  },
  {
    country: "Italy",
    artifact: "Classic Pepperoni Pizza & Olive",
    mode: "artifact",
    explanation: "Modern Pizza was born in Naples, Italy, in the late 1800s! A famous baker created the Margherita pizza (tomato, mozzarella, basil) to match the colors of the Italian flag for Queen Margherita.",
    mapCoord: { x: 495, y: 155 },
    pathColor: "#ef4444"
  },
  {
    country: "United Kingdom",
    artifact: "Royal Double-Decker Bus & Tea",
    mode: "artifact",
    explanation: "The bright red Double-Decker Bus is an iconic symbol of London! First introduced in the 1950s, these tall buses are designed to carry twice as many passengers through busy, historic city streets.",
    mapCoord: { x: 460, y: 135 },
    pathColor: "#3b82f6"
  },
  {
    country: "Peru",
    artifact: "Andean Llama & Machu Picchu",
    mode: "artifact",
    explanation: "Llamas are fuzzy, friendly pack animals native to the high Andes mountains of Peru! They were domesticated thousands of years ago by the Incas to carry supplies across steep mountain trails.",
    mapCoord: { x: 300, y: 300 },
    pathColor: "#f59e0b"
  },
  {
    country: "South Africa",
    artifact: "Majestic African Lion Face",
    mode: "artifact",
    explanation: "South Africa is home to incredible wildlife reserves where the 'Big Five' roam! The African Lion is known as the 'King of the Jungle,' living in close-knit family groups called prides.",
    mapCoord: { x: 510, y: 340 },
    pathColor: "#10b981"
  },
  {
    country: "Spain",
    artifact: "Flamenco Guitar & Paella",
    mode: "artifact",
    explanation: "Flamenco music and classical Spanish guitar originated in Andalusia! This style blends expressive acoustic guitar playing, hand-clapping, and passionate dancing.",
    mapCoord: { x: 460, y: 165 },
    pathColor: "#f97316"
  },
  {
    country: "Germany",
    artifact: "Traditional Baked Pretzel",
    mode: "artifact",
    explanation: "Pretzels ('Brezeln') are delicious baked knot-pastries popular in Germany for over a thousand years! They have a unique brown crust, soft interior, and are sprinkled with large salt crystals.",
    mapCoord: { x: 485, y: 145 },
    pathColor: "#f59e0b"
  },
  {
    country: "Thailand",
    artifact: "Royal Elephant & Pad Thai",
    mode: "artifact",
    explanation: "Elephants are highly revered royal symbols of strength and good fortune in Thailand! They are celebrated in art, history, and festivals throughout this beautiful Southeast Asian nation.",
    mapCoord: { x: 640, y: 220 },
    pathColor: "#8b5cf6"
  },
  {
    country: "Greece",
    artifact: "Ancient Olympian Column & Olive Branch",
    mode: "artifact",
    explanation: "Ancient Greece is the birthplace of democracy, philosophy, and the Olympic games! White marble columns from temples like the Parthenon are iconic symbols of classical architecture.",
    mapCoord: { x: 510, y: 165 },
    pathColor: "#3b82f6"
  }
];

const ALL_COUNTRIES = DATA.map(d => d.country);

// High-fidelity vector drawings of artifacts
const renderArtifactSVG = (country) => {
  switch (country) {
    case "France":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#311042" />
            </linearGradient>
            <linearGradient id="croissantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#skyGrad)" />
          {/* Moon */}
          <circle cx="160" cy="40" r="15" fill="#fef08a" opacity="0.8" />
          <circle cx="154" cy="36" r="15" fill="url(#skyGrad)" />
          
          {/* Eiffel Tower */}
          <path d="M90,160 L110,160 L104,70 L96,70 Z" fill="none" stroke="#ec4899" strokeWidth="3" filter="drop-shadow(0 0 5px #ec4899)" />
          <path d="M80,170 L120,170 L108,120 L92,120 Z" fill="none" stroke="#ec4899" strokeWidth="2" />
          <line x1="100" y1="70" x2="100" y2="40" stroke="#f472b6" strokeWidth="2" />
          <path d="M70,180 L130,180 L115,145 L85,145 Z" fill="none" stroke="#ec4899" strokeWidth="2.5" />
          <path d="M85,180 C90,165 110,165 115,180" fill="none" stroke="#ec4899" strokeWidth="2" />

          {/* Golden Croissant */}
          <path d="M30,150 C35,130 65,120 90,135 C115,120 145,130 150,150 C130,165 110,155 90,160 C70,155 50,165 30,150 Z" fill="url(#croissantGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
          {/* Flaky lines */}
          <path d="M60,130 C65,140 68,150 65,158" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M90,135 C93,142 93,150 90,159" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M120,130 C118,140 115,150 118,158" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      );
    case "Egypt":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="egyptSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="pyramidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#egyptSky)" />
          {/* Huge sun */}
          <circle cx="100" cy="110" r="35" fill="#fef08a" opacity="0.25" />
          <circle cx="100" cy="110" r="25" fill="#fef08a" opacity="0.5" />

          {/* Pyramids */}
          {/* Left / Back Pyramid */}
          <polygon points="20,165 70,110 95,165" fill="#b45309" opacity="0.7" />
          <polygon points="70,110 95,165 110,165" fill="#78350f" opacity="0.7" />

          {/* Main Pyramid */}
          <polygon points="60,170 120,95 160,170" fill="url(#pyramidGrad)" />
          <polygon points="120,95 160,170 185,170" fill="#78350f" />
          
          {/* Ground */}
          <path d="M0,165 Q50,160 100,168 T200,165 L200,200 L0,200 Z" fill="#d97706" />

          {/* Sphinx silhouette */}
          <path d="M15,170 C15,160 25,160 28,155 C30,150 25,145 30,140 C35,140 38,145 36,155 C45,155 52,162 55,170 Z" fill="#78350f" />
        </svg>
      );
    case "Japan":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#bgGrad)" />
          {/* Red sun flag look */}
          <circle cx="100" cy="100" r="50" fill="#ef4444" opacity="0.15" />
          
          {/* Sushi roll 1 */}
          <g transform="translate(65, 110)">
            <rect x="0" y="0" width="70" height="50" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            <ellipse cx="35" cy="5" rx="33" ry="15" fill="#f8fafc" />
            {/* Salmon center */}
            <ellipse cx="35" cy="5" rx="15" ry="7" fill="#f97316" />
            {/* Avocado center */}
            <ellipse cx="25" cy="5" rx="6" ry="3" fill="#22c55e" />
          </g>

          {/* Sushi roll 2 */}
          <g transform="translate(90, 80)">
            <rect x="0" y="0" width="55" height="40" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            <ellipse cx="27.5" cy="4" rx="25" ry="11" fill="#f8fafc" />
            <ellipse cx="27.5" cy="4" rx="10" ry="5" fill="#f43f5e" />
          </g>

          {/* Chopsticks */}
          <line x1="30" y1="160" x2="170" y2="40" stroke="#d97706" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))" />
          <line x1="20" y1="150" x2="160" y2="30" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))" />

          {/* Cherry Blossom (Sakura) */}
          <g transform="translate(30, 40)" fill="#f472b6" opacity="0.9">
            <circle cx="0" cy="0" r="8" />
            <circle cx="10" cy="0" r="8" />
            <circle cx="5" cy="8" r="8" />
            <circle cx="-5" cy="8" r="8" />
            <circle cx="0" cy="-6" r="8" />
            <circle cx="2.5" cy="2.5" r="3" fill="#fef08a" />
          </g>
        </svg>
      );
    case "India":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="indiaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#indiaSky)" />

          {/* Taj dome silhouette with neon glow */}
          <path d="M60,150 L140,150 L140,120 L135,120 C135,100 125,95 125,90 C125,80 115,75 100,75 C85,75 75,80 75,90 C75,95 65,100 65,120 L60,120 Z" fill="none" stroke="#2dd4bf" strokeWidth="3" filter="drop-shadow(0 0 8px #2dd4bf)" />
          <line x1="100" y1="75" x2="100" y2="55" stroke="#2dd4bf" strokeWidth="2" />
          {/* Minarets */}
          <line x1="45" y1="150" x2="45" y2="85" stroke="#2dd4bf" strokeWidth="2" />
          <line x1="155" y1="150" x2="155" y2="85" stroke="#2dd4bf" strokeWidth="2" />
          
          {/* Base */}
          <rect x="35" y="150" width="130" height="10" fill="none" stroke="#2dd4bf" strokeWidth="3" />

          {/* Lotus Flower */}
          <g transform="translate(100, 165)">
            {/* Lotus Petals */}
            <path d="M0,-15 C-15,5 -25,-5 -25,10 C-15,12 15,12 25,10 C25,-5 15,5 0,-15 Z" fill="#f43f5e" />
            <path d="M0,-20 C-8,-5 -15,-5 -15,5 C-5,8 5,8 15,5 C15,-5 8,-5 0,-20 Z" fill="#fb7185" />
            <circle cx="0" cy="0" r="3" fill="#fef08a" />
          </g>
        </svg>
      );
    case "Brazil":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#forestGrad)" />

          {/* Tropical Leaf */}
          <path d="M30,170 Q70,90 170,70 Q140,120 30,170" fill="#047857" opacity="0.6" />
          <path d="M40,180 Q80,100 180,80 Q150,130 40,180" fill="#10b981" />

          {/* Toucan */}
          {/* Tail */}
          <rect x="73" y="120" width="10" height="40" fill="#0f172a" rx="4" />
          {/* Body */}
          <circle cx="80" cy="100" r="22" fill="#0f172a" />
          <ellipse cx="90" cy="100" rx="12" ry="18" fill="#ffffff" />
          {/* Eye */}
          <circle cx="94" cy="90" r="5" fill="#3b82f6" />
          <circle cx="94" cy="90" r="2" fill="#000000" />
          {/* Huge Beak */}
          <path d="M102,82 C120,80 145,90 155,105 C135,115 110,110 102,100 Z" fill="#f97316" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <path d="M142,94 C150,98 155,105 155,105 C145,108 138,103 142,94 Z" fill="#ef4444" />
          {/* Branch */}
          <line x1="40" y1="130" x2="130" y2="130" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case "Australia":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="outbackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#outbackGrad)" />
          
          {/* Big Outback Sun */}
          <circle cx="100" cy="90" r="45" fill="#fef08a" opacity="0.8" />

          {/* Kangaroo silhouette */}
          <path d="M50,150 C55,145 60,135 60,125 C60,110 70,105 80,95 C82,90 78,80 82,70 C85,65 92,60 92,55 C92,52 88,48 90,45 C92,42 98,48 98,52 C98,58 93,65 95,70 C97,75 105,75 112,85 C118,92 120,105 115,115 C110,125 90,140 90,150 C110,152 135,145 155,138 C135,153 105,160 85,160 C70,160 55,155 50,150 Z" fill="#1c0d02" />

          {/* Boomerang */}
          <path d="M25,50 Q45,25 65,50 Q50,45 25,50" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" transform="rotate(-20 40 40)" />
        </svg>
      );
    case "China":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="bambooBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#bambooBg)" />
          
          {/* Bamboo stalks in background */}
          <line x1="40" y1="0" x2="40" y2="200" stroke="#047857" strokeWidth="6" opacity="0.4" />
          <line x1="160" y1="0" x2="160" y2="200" stroke="#047857" strokeWidth="8" opacity="0.3" />

          {/* Cute Panda */}
          {/* Ears */}
          <circle cx="70" cy="70" r="16" fill="#0f172a" />
          <circle cx="130" cy="70" r="16" fill="#0f172a" />
          {/* Head */}
          <circle cx="100" cy="100" r="40" fill="#ffffff" />
          {/* Eye patches */}
          <ellipse cx="84" cy="96" rx="12" ry="8" fill="#0f172a" transform="rotate(-15 84 96)" />
          <ellipse cx="116" cy="96" rx="12" ry="8" fill="#0f172a" transform="rotate(15 116 96)" />
          {/* Eyes */}
          <circle cx="84" cy="96" r="3" fill="#ffffff" />
          <circle cx="116" cy="96" r="3" fill="#ffffff" />
          {/* Snout & Nose */}
          <ellipse cx="100" cy="112" rx="10" ry="7" fill="#f8fafc" />
          <polygon points="96,110 104,110 100,115" fill="#0f172a" />

          {/* Hand holding Bamboo */}
          <g transform="translate(130, 130)">
            <line x1="-30" y1="30" x2="20" y2="-20" stroke="#10b981" strokeWidth="5" />
            <circle cx="0" cy="0" r="10" fill="#0f172a" />
          </g>
        </svg>
      );
    case "United States":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="usaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="torchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#usaSky)" />
          {/* Stars in sky */}
          <circle cx="40" cy="40" r="1.5" fill="white" />
          <circle cx="160" cy="50" r="1.5" fill="white" />
          <circle cx="90" cy="30" r="1.5" fill="white" />

          {/* Statue of Liberty Torch */}
          {/* Handle */}
          <path d="M92,170 L108,170 L104,110 L96,110 Z" fill="#64748b" />
          <path d="M85,110 L115,110 L110,95 L90,95 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Glowing Flame */}
          <path d="M100,35 C115,60 120,70 120,95 C120,105 80,105 80,95 C80,75 85,60 100,35 Z" fill="url(#torchGrad)" filter="drop-shadow(0 0 12px #f59e0b)" />
          <path d="M100,50 C108,65 110,75 110,95 C110,100 90,100 90,95 C90,80 92,70 100,50 Z" fill="#fef08a" />
        </svg>
      );
    case "Canada":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="canadaBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#canadaBg)" />

          {/* Maple Leaf */}
          <g transform="translate(100, 100) scale(1.4)" filter="drop-shadow(0 5px 10px rgba(0,0,0,0.5))">
            <path d="M0,-45 L8,-25 L25,-32 L18,-12 L38,-15 L25,8 L35,15 L12,15 L18,30 L0,22 L-18,30 L-12,15 L-35,15 L-25,8 L-38,-15 L-18,-12 L-25,-32 L-8,-25 Z" fill="url(#leafGrad)" />
            {/* Stem */}
            <rect x="-3" y="20" width="6" height="25" fill="#991b1b" rx="2" />
          </g>
        </svg>
      );
    case "Mexico":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="mexicoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="tacoShell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#mexicoBg)" />

          {/* Taco Shell */}
          <path d="M35,130 C35,70 165,70 165,130 L135,130 C135,95 65,95 65,130 Z" fill="url(#tacoShell)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))" />

          {/* Fillings poking out */}
          {/* Meat */}
          <circle cx="70" cy="115" r="10" fill="#78350f" />
          <circle cx="130" cy="115" r="10" fill="#78350f" />
          <circle cx="100" cy="110" r="12" fill="#78350f" />
          {/* Tomatoes (red) */}
          <rect x="80" y="92" width="12" height="12" rx="2" fill="#ef4444" transform="rotate(15 80 92)" />
          <rect x="110" y="92" width="12" height="12" rx="2" fill="#ef4444" transform="rotate(-10 110 92)" />
          {/* Lettuce (green) */}
          <path d="M50,110 Q60,95 70,105 Q80,90 95,105 Q110,95 125,110" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />

          {/* Chili pepper */}
          <g transform="translate(140, 130) rotate(-30)">
            <path d="M0,0 C10,-10 30,-5 35,-25 C25,-15 10,-20 0,0" fill="#ef4444" />
            <path d="M35,-25 C38,-28 42,-25 40,-20" fill="#22c55e" stroke="#22c55e" strokeWidth="2" />
          </g>
        </svg>
      );
    case "Italy":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="italySky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14532d" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="crustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#italySky)" />

          {/* Pizza Slice */}
          <g transform="translate(100, 100) rotate(-15)">
            {/* Crust */}
            <path d="M-60,-50 C-20,-75 20,-75 60,-50 L0,70 Z" fill="url(#crustGrad)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.5))" />
            {/* Cheese */}
            <path d="M-50,-46 C-15,-68 15,-68 50,-46 L0,55 Z" fill="#facc15" />
            
            {/* Tomato sauce swirls */}
            <path d="M-30,-40 Q0,-50 30,-40" stroke="#ef4444" strokeWidth="4" fill="none" opacity="0.8" />

            {/* Pepperoni slices */}
            <circle cx="-20" cy="-25" r="10" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
            <circle cx="20" cy="-25" r="10" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
            <circle cx="0" cy="10" r="10" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
            
            {/* Basil Leaf */}
            <path d="M-15,5 C-10,-5 0,-5 0,5 C0,10 -10,10 -15,5" fill="#22c55e" />
          </g>
        </svg>
      );
    case "United Kingdom":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="londonSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#londonSky)" />
          {/* Big Ben silhouette outline */}
          <path d="M35,180 L35,90 L45,80 L45,40 L55,40 L55,80 L65,90 L65,180 Z" fill="none" stroke="#475569" strokeWidth="2" />
          <circle cx="50" cy="65" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

          {/* London Red Bus */}
          <g transform="translate(60, 100)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
            {/* Main Red Body */}
            <rect x="0" y="0" width="110" height="60" rx="8" fill="#dc2626" />
            <rect x="0" y="30" width="110" height="4" fill="#1e293b" />
            
            {/* Windows Upper Deck */}
            <rect x="10" y="8" width="15" height="15" rx="3" fill="#fef08a" />
            <rect x="32" y="8" width="15" height="15" rx="3" fill="#fef08a" />
            <rect x="54" y="8" width="15" height="15" rx="3" fill="#fef08a" />
            <rect x="76" y="8" width="15" height="15" rx="3" fill="#fef08a" />
            
            {/* Windows Lower Deck */}
            <rect x="32" y="38" width="15" height="15" rx="3" fill="#fef08a" />
            <rect x="54" y="38" width="15" height="15" rx="3" fill="#fef08a" />
            <rect x="76" y="38" width="15" height="15" rx="3" fill="#fef08a" />
            {/* Front windshield */}
            <path d="M96,8 L104,8 L104,23 L96,23 Z" fill="#e2e8f0" />

            {/* Wheels */}
            <circle cx="25" cy="60" r="14" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="25" cy="60" r="5" fill="#94a3b8" />
            <circle cx="85" cy="60" r="14" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="85" cy="60" r="5" fill="#94a3b8" />
          </g>
        </svg>
      );
    case "Peru":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="peruSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#075985" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#peruSky)" />
          {/* Mountain outlines */}
          <polygon points="10,180 80,90 140,180" fill="#0369a1" />
          <polygon points="90,180 150,110 200,180" fill="#0284c7" />

          {/* Cute Llama */}
          <g transform="translate(45, 75)">
            {/* Legs */}
            <rect x="25" y="65" width="8" height="30" fill="#f8fafc" rx="4" />
            <rect x="45" y="65" width="8" height="30" fill="#f8fafc" rx="4" />
            {/* Body */}
            <ellipse cx="40" cy="50" rx="25" ry="18" fill="#f8fafc" />
            {/* Neck */}
            <path d="M22,50 L22,15 L36,15 L36,50 Z" fill="#f8fafc" />
            {/* Head */}
            <ellipse cx="22" cy="15" rx="12" ry="8" fill="#f8fafc" />
            {/* Ears */}
            <path d="M15,10 L12,-2 L18,5 Z" fill="#e2e8f0" />
            <path d="M22,10 L25,-2 L29,5 Z" fill="#e2e8f0" />
            {/* Eye */}
            <circle cx="18" cy="13" r="2" fill="#0f172a" />
            {/* Snout */}
            <circle cx="28" cy="16" r="3" fill="#cbd5e1" />

            {/* Colorful Peruvian Scarf */}
            <rect x="18" y="32" width="20" height="8" fill="#ef4444" rx="2" />
            <rect x="22" y="32" width="4" height="15" fill="#f59e0b" rx="1" />
            <rect x="30" y="32" width="4" height="15" fill="#10b981" rx="1" />
          </g>
        </svg>
      );
    case "South Africa":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="safariGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="60%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <radialGradient id="maneGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="70%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#431407" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#safariGrad)" />
          
          {/* Acacia tree silhouette */}
          <path d="M160,180 L160,130 C160,120 145,115 130,110 C145,100 180,95 190,110 Z" fill="#1c1917" />
          <path d="M140,110 C120,105 100,110 90,115 L90,125" stroke="#1c1917" strokeWidth="4" fill="none" />

          {/* Lion Face */}
          <g transform="translate(90, 95)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))">
            {/* Mane */}
            <circle cx="0" cy="0" r="48" fill="url(#maneGrad)" />
            {/* Ears */}
            <circle cx="-25" cy="-25" r="12" fill="#d97706" />
            <circle cx="25" cy="-25" r="12" fill="#d97706" />
            {/* Head */}
            <circle cx="0" cy="0" r="32" fill="#f59e0b" />
            {/* Muzzle */}
            <ellipse cx="0" cy="12" rx="14" ry="10" fill="#fef08a" />
            <polygon points="-5,6 5,6 0,12" fill="#431407" />
            {/* Eyes */}
            <circle cx="-10" cy="-6" r="4" fill="#431407" />
            <circle cx="10" cy="-6" r="4" fill="#431407" />
            <circle cx="-11" cy="-7" r="1.5" fill="white" />
            <circle cx="9" cy="-7" r="1.5" fill="white" />
          </g>
        </svg>
      );
    case "Spain":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="spainBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="guitarBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#spainBg)" />

          {/* Flamenco Guitar */}
          <g transform="translate(100, 100) rotate(25)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
            {/* Neck & Headstock */}
            <rect x="-6" y="-95" width="12" height="60" fill="#78350f" />
            <rect x="-9" y="-110" width="18" height="20" fill="#451a03" rx="2" />
            
            {/* Strings */}
            <line x1="-3" y1="-100" x2="-3" y2="40" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
            <line x1="-1" y1="-100" x2="-1" y2="40" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
            <line x1="1" y1="-100" x2="1" y2="40" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />
            <line x1="3" y1="-100" x2="3" y2="40" stroke="#e2e8f0" strokeWidth="1" opacity="0.8" />

            {/* Upper and Lower Bout */}
            <circle cx="0" cy="-20" r="24" fill="url(#guitarBody)" />
            <circle cx="0" cy="20" r="34" fill="url(#guitarBody)" />
            
            {/* Sound Hole */}
            <circle cx="0" cy="-10" r="10" fill="#1e1b4b" stroke="#fef08a" strokeWidth="2" />
            
            {/* Bridge */}
            <rect x="-18" y="25" width="36" height="6" fill="#451a03" rx="1" />
          </g>
        </svg>
      );
    case "Germany":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="germanyBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#450e07" />
            </linearGradient>
            <linearGradient id="pretzelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#germanyBg)" />

          {/* Traditional Pretzel */}
          <g transform="translate(100, 100)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.5))">
            {/* Outer ring */}
            <path d="M-60,-20 C-60,-65 60,-65 60,-20 C60,20 30,50 0,50 C-30,50 -60,20 -60,-20 Z" fill="none" stroke="url(#pretzelGrad)" strokeWidth="20" strokeLinecap="round" />
            {/* Intersecting loops */}
            <path d="M-48,-30 C-20,0 0,30 20,10 C35,-5 25,-40 0,-40 C-25,-40 -35,-5 -20,10 C0,30 20,0 48,-30" fill="none" stroke="url(#pretzelGrad)" strokeWidth="16" strokeLinecap="round" />
            
            {/* Salt Crystals */}
            <rect x="-35" y="-45" width="4" height="4" fill="white" transform="rotate(15 -35 -45)" />
            <rect x="-15" y="-52" width="4" height="4" fill="white" transform="rotate(45 -15 -52)" />
            <rect x="15" y="-52" width="4" height="4" fill="white" transform="rotate(-30 15 -52)" />
            <rect x="35" y="-45" width="4" height="4" fill="white" transform="rotate(20 35 -45)" />
            <rect x="-42" y="10" width="4" height="4" fill="white" />
            <rect x="42" y="10" width="4" height="4" fill="white" />
            <rect x="0" y="40" width="4" height="4" fill="white" transform="rotate(45 0 40)" />
          </g>
        </svg>
      );
    case "Thailand":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="thaiBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#311042" />
            </linearGradient>
            <linearGradient id="elephantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#thaiBg)" />

          {/* Royal Elephant */}
          <g transform="translate(35, 75)">
            {/* Tail */}
            <path d="M15,50 L5,75" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            {/* Legs */}
            <rect x="25" y="55" width="15" height="35" fill="url(#elephantGrad)" rx="4" />
            <rect x="50" y="55" width="15" height="35" fill="url(#elephantGrad)" rx="4" />
            <rect x="80" y="55" width="15" height="35" fill="url(#elephantGrad)" rx="4" />
            {/* Body */}
            <ellipse cx="55" cy="40" rx="40" ry="30" fill="url(#elephantGrad)" />
            {/* Head */}
            <circle cx="95" cy="25" r="20" fill="url(#elephantGrad)" />
            {/* Ear */}
            <path d="M78,12 C72,25 78,45 92,40 C98,35 95,15 78,12 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
            {/* Trunk */}
            <path d="M110,25 C125,25 130,5 125,-5" fill="none" stroke="url(#elephantGrad)" strokeWidth="8" strokeLinecap="round" />
            {/* Tusk */}
            <path d="M106,32 C115,35 118,32 120,30" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            
            {/* Ceremonial Blanket (Red & Gold) */}
            <path d="M38,20 C45,18 65,18 72,20 L68,48 C60,52 50,52 42,48 Z" fill="#dc2626" />
            <rect x="48" y="24" width="14" height="18" fill="#f59e0b" rx="2" />
          </g>
        </svg>
      );
    case "Greece":
      return (
        <svg viewBox="0 0 200 200" className="artifact-svg">
          <defs>
            <linearGradient id="greeceSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="20" fill="url(#greeceSky)" />

          {/* Olympian Temple Columns */}
          <g transform="translate(55, 60)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
            {/* Architrave / Roof */}
            <polygon points="-15,0 105,0 45,-25" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="-10" y="0" width="110" height="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            
            {/* 3 Columns */}
            {/* Column 1 */}
            <rect x="5" y="12" width="14" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="12" y1="12" x2="12" y2="97" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Column 2 */}
            <rect x="38" y="12" width="14" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="45" y1="12" x2="45" y2="97" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Column 3 */}
            <rect x="71" y="12" width="14" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="78" y1="12" x2="78" y2="97" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Stylobate / Steps */}
            <rect x="-15" y="97" width="120" height="8" fill="#e2e8f0" />
            <rect x="-20" y="105" width="130" height="8" fill="#cbd5e1" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

// Simplified stylized responsive World Map with neon highlights
const WorldMap = ({ targetCoord, highlightColor }) => {
  return (
    <div className="world-map-wrapper">
      <svg viewBox="0 0 1000 480" className="world-map-svg">
        <defs>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Oceans / Grid Background */}
        <rect width="1000" height="480" fill="#0b0f19" rx="20" />
        <path d="M 0,80 L 1000,80 M 0,160 L 1000,160 M 0,240 L 1000,240 M 0,320 L 1000,320 M 0,400 L 1000,400 M 125,0 L 125,480 M 250,0 L 250,480 M 375,0 L 375,480 M 500,0 L 500,480 M 625,0 L 625,480 M 750,0 L 750,480 M 875,0 L 875,480" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
        
        {/* CONTINENT 1: North America */}
        <path d="M 80,60 L 280,60 L 320,130 L 260,190 L 200,230 L 160,230 L 190,190 L 140,170 L 110,130 L 80,100 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        
        {/* CONTINENT 2: South America */}
        <path d="M 280,250 L 330,270 L 370,330 L 330,420 L 290,440 L 280,380 L 260,310 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* CONTINENT 3: Europe & Asia (Eurasia) */}
        <path d="M 440,70 L 560,50 L 780,50 L 840,110 L 820,190 L 760,250 L 620,270 L 560,230 L 520,240 L 460,200 L 420,150 L 420,100 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* CONTINENT 4: Africa */}
        <path d="M 430,210 L 500,200 L 550,230 L 560,280 L 520,380 L 480,380 L 460,330 L 420,260 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* CONTINENT 5: Australia & Oceania */}
        <path d="M 680,290 L 740,290 L 780,340 L 760,390 L 690,390 L 660,340 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* Selected Country Glowing Target Pulse */}
        <g transform={`translate(${targetCoord.x}, ${targetCoord.y})`}>
          {/* Pulsing ring 1 */}
          <circle cx="0" cy="0" r="28" fill="none" stroke={highlightColor} strokeWidth="1.5" opacity="0.3" filter="url(#glowEffect)">
            <animate attributeName="r" values="5;32" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Pulsing ring 2 */}
          <circle cx="0" cy="0" r="18" fill="none" stroke={highlightColor} strokeWidth="2.5" opacity="0.6">
            <animate attributeName="r" values="3;22" dur="2s" begin="0.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0" dur="2s" begin="0.7s" repeatCount="indefinite" />
          </circle>
          {/* Solid core center pin */}
          <circle cx="0" cy="0" r="8" fill={highlightColor} filter="url(#glowEffect)" />
          <circle cx="0" cy="0" r="4" fill="#ffffff" />
        </g>
      </svg>
      <div className="radar-ping-tag" style={{ border: `2px solid ${highlightColor}`, boxShadow: `0 0 10px ${highlightColor}` }}>
        <Navigation size={14} className="geo-ping-icon animate-pulse" style={{ color: highlightColor }} />
        <span>LOCATION DETECTED</span>
      </div>
    </div>
  );
};

export default function GeographyGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);
  
  // Game States
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'CORRECT', 'INCORRECT', null
  const [gameMode, setGameMode] = useState("artifact"); // "artifact" or "map"

  const updateGlobalScore = (points) => {
    if (!activeProfile) return;
    const updatedProfile = { ...activeProfile, score: activeProfile.score + points };
    setActiveProfile(updatedProfile);
    
    const saved = localStorage.getItem('hub-profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      const newProfiles = parsed.map(p => p.id === activeProfile.id ? updatedProfile : p);
      localStorage.setItem('hub-profiles', JSON.stringify(newProfiles));
    }
  };

  const triggerReward = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 55,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#ec4899', '#f59e0b']
      });
      confetti({
        particleCount: 6,
        angle: 125,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#ec4899', '#f59e0b']
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const generateRound = (forceCountryName = null) => {
    let item;
    
    if (forceCountryName) {
      const matched = DATA.find(d => d.country.toLowerCase() === forceCountryName.toLowerCase());
      if (matched) item = matched;
    }

    if (!item) {
      // Pick random country
      item = DATA[Math.floor(Math.random() * DATA.length)];
      // Avoid immediate repeats
      if (currentArtifact && currentArtifact.country === item.country) {
         item = DATA[(DATA.indexOf(item) + 1) % DATA.length];
      }
    }
    
    // Choose mode: alternate or pick randomly
    const randomMode = Math.random() > 0.5 ? "artifact" : "map";
    setGameMode(randomMode);

    // Pick distractors
    let distractors = ALL_COUNTRIES.filter(c => c !== item.country);
    distractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const finalOptions = [item.country, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentArtifact(item);
    setOptions(finalOptions);
    setFeedback(null);

    // Sync URL Address Bar with the current country!
    const newUrl = `${window.location.pathname}?country=${encodeURIComponent(item.country)}`;
    window.history.pushState(null, '', newUrl);
  };

  // Sync on start & query param loading
  useEffect(() => {
    if (activeProfile && !currentArtifact) {
       const queryParams = new URLSearchParams(window.location.search);
       const paramCountry = queryParams.get('country');
       generateRound(paramCountry);
    }
  }, [activeProfile]);

  const handleSelection = (country) => {
    if (feedback) return;

    if (country === currentArtifact.country) {
      setFeedback('CORRECT');
      updateGlobalScore(15);
      triggerReward();
    } else {
      setFeedback('INCORRECT');
    }
  };

  const nextQuestion = () => {
    generateRound();
  };

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  return (
    <div className="geo-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => {
          // Clear query param on profile back
          window.history.pushState(null, '', window.location.pathname);
          setActiveProfile(null);
        }}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
        </div>
      </div>

      <div className="geo-board">
        <h1 className="geo-title"><Earth size={36} className="text-blue-glow animate-spin-slow" /> World Explorer</h1>
        
        {gameMode === "artifact" ? (
          <p className="geo-subtitle">Can you guess which country this unique food, animal, or artifact is from?</p>
        ) : (
          <p className="geo-subtitle">A country is highlighted in neon on the globe! Can you identify which country it is?</p>
        )}

        {currentArtifact && (
          <div className="geo-gameplay-area">
            {gameMode === "artifact" ? (
              <div className="artifact-frame neon-purple-glow">
                {renderArtifactSVG(currentArtifact.country)}
              </div>
            ) : (
              <div className="map-frame neon-blue-glow">
                <WorldMap targetCoord={currentArtifact.mapCoord} highlightColor={currentArtifact.pathColor} />
              </div>
            )}
          </div>
        )}

        {feedback === null && (
           <div className="geo-options">
             {options.map(opt => (
               <button key={opt} className="geo-btn" onClick={() => handleSelection(opt)}>
                 {opt}
               </button>
             ))}
           </div>
        )}

        {feedback === 'CORRECT' && (
          <div className="geo-feedback correct bounce-in">
            <h2>🌍 Excellent! It's {currentArtifact.country}!</h2>
            <div className="geo-fact">
              <div className="geo-fact-header">
                 <Compass size={24} className="text-emerald-400" />
                 <h3>{currentArtifact.artifact}</h3>
              </div>
              <p>{currentArtifact.explanation}</p>
            </div>
            <button className="next-btn" onClick={nextQuestion}>Next Adventure</button>
          </div>
        )}

        {feedback === 'INCORRECT' && (
           <div className="geo-feedback incorrect shake">
             <h2>Not quite! The correct answer is {currentArtifact.country}.</h2>
             <div className="geo-fact" style={{ borderColor: '#f59e0b' }}>
               <div className="geo-fact-header">
                  <Compass size={24} className="text-amber-500" />
                  <h3>{currentArtifact.artifact}</h3>
               </div>
               <p>{currentArtifact.explanation}</p>
             </div>
             <button className="next-btn" onClick={nextQuestion}>Move On</button>
           </div>
        )}
      </div>
    </div>
  );
}
