import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './PuzzleGame.css';
import { Trophy, ArrowLeft, Heart, Sparkles, Smile, RefreshCw } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

// Puzzle Themes & SVG Assets
const PUZZLE_LEVELS = [
  // --- Animals Category ---
  {
    id: 'panda',
    category: 'animals',
    name: 'Happy Panda',
    color: '#34d399',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        <circle cx="35" cy="35" r="14" fill="#1e293b" />
        <circle cx="65" cy="35" r="14" fill="#1e293b" />
        <circle cx="50" cy="55" r="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <ellipse cx="38" cy="50" rx="10" ry="7" fill="#1e293b" transform="rotate(-15 38 50)" />
        <ellipse cx="62" cy="50" rx="10" ry="7" fill="#1e293b" transform="rotate(15 62 50)" />
        <circle cx="38" cy="50" r="3" fill="#ffffff" />
        <circle cx="62" cy="50" r="3" fill="#ffffff" />
        <polygon points="46,60 54,60 50,65" fill="#1e293b" />
        <path d="M45,70 C48,73 52,73 55,70" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'fox',
    category: 'animals',
    name: 'Sleeping Fox',
    color: '#fb923c',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        {/* Tail */}
        <path d="M70,65 C85,60 90,45 80,35 C70,45 65,55 70,65 Z" fill="#ea580c" />
        <path d="M80,35 C83,38 81,42 77,45 Z" fill="#ffffff" />
        {/* Body */}
        <circle cx="50" cy="55" r="25" fill="#ea580c" />
        <ellipse cx="50" cy="62" rx="20" ry="12" fill="#ffffff" />
        {/* Head */}
        <polygon points="50,42 30,18 70,18" fill="#ea580c" />
        <polygon points="50,42 38,28 62,28" fill="#ffffff" />
        {/* Ears */}
        <polygon points="32,20 22,2 40,12" fill="#ea580c" />
        <polygon points="68,20 78,2 60,12" fill="#ea580c" />
        {/* Sleeping Eyes */}
        <path d="M38,28 C40,31 44,31 46,28" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M54,28 C56,31 60,31 62,28" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="35" r="3" fill="#1e293b" />
      </svg>
    )
  },
  {
    id: 'lion',
    category: 'animals',
    name: 'Friendly Lion',
    color: '#facc15',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        {/* Mane */}
        <circle cx="50" cy="50" r="42" fill="#ea580c" />
        {/* Ears */}
        <circle cx="28" cy="28" r="10" fill="#f59e0b" />
        <circle cx="72" cy="28" r="10" fill="#f59e0b" />
        {/* Face */}
        <circle cx="50" cy="52" r="30" fill="#facc15" />
        <ellipse cx="50" cy="62" rx="12" ry="8" fill="#fef08a" />
        <polygon points="46,58 54,58 50,63" fill="#7c2d12" />
        {/* Eyes */}
        <circle cx="40" cy="46" r="4" fill="#7c2d12" />
        <circle cx="60" cy="46" r="4" fill="#7c2d12" />
        <circle cx="39" cy="45" r="1.5" fill="white" />
        <circle cx="59" cy="45" r="1.5" fill="white" />
        {/* Mouth */}
        <path d="M46,67 Q50,71 54,67" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  
  // --- Fruits Category ---
  {
    id: 'strawberry',
    category: 'fruits',
    name: 'Sweet Strawberry',
    color: '#f87171',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        {/* Green leaves */}
        <path d="M50,22 Q30,10 40,32 Q50,15 60,32 Q70,10 50,22" fill="#22c55e" />
        {/* Strawberry body */}
        <path d="M50,88 C85,70 82,30 50,30 C18,30 15,70 50,88 Z" fill="#ef4444" />
        {/* Seeds */}
        <circle cx="38" cy="45" r="2" fill="#fef08a" />
        <circle cx="62" cy="45" r="2" fill="#fef08a" />
        <circle cx="50" cy="55" r="2" fill="#fef08a" />
        <circle cx="34" cy="65" r="2" fill="#fef08a" />
        <circle cx="66" cy="65" r="2" fill="#fef08a" />
        <circle cx="50" cy="75" r="2" fill="#fef08a" />
        {/* Cute Face */}
        <circle cx="44" cy="50" r="3.5" fill="#1e293b" />
        <circle cx="56" cy="50" r="3.5" fill="#1e293b" />
        <path d="M48,58 Q50,61 52,58" stroke="#1e293b" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'watermelon',
    category: 'fruits',
    name: 'Happy Watermelon',
    color: '#4ade80',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        {/* Rind (Green) */}
        <path d="M10,45 C10,95 90,95 90,45 Z" fill="#15803d" />
        <path d="M16,45 C16,88 84,88 84,45 Z" fill="#4ade80" />
        {/* White Layer */}
        <path d="M20,45 C20,83 80,83 80,45 Z" fill="#f8fafc" />
        {/* Red Flesh */}
        <path d="M24,45 C24,78 76,78 76,45 Z" fill="#f43f5e" />
        {/* Seeds */}
        <ellipse cx="36" cy="58" rx="2" ry="3" fill="#1e293b" />
        <ellipse cx="64" cy="58" rx="2" ry="3" fill="#1e293b" />
        <ellipse cx="50" cy="68" rx="2" ry="3" fill="#1e293b" />
        {/* Face */}
        <circle cx="44" cy="50" r="4" fill="#1e293b" />
        <circle cx="56" cy="50" r="4" fill="#1e293b" />
        <path d="M48,55 Q50,58 52,55" stroke="#1e293b" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'pineapple',
    category: 'fruits',
    name: 'Cool Pineapple',
    color: '#fbbf24',
    svg: (
      <svg viewBox="0 0 100 100" className="puzzle-svg">
        {/* Leafy Crown */}
        <path d="M50,30 Q35,5 45,20 Q50,0 55,20 Q65,5 50,30" fill="#15803d" />
        {/* Pineapple body */}
        <rect x="30" y="28" width="40" height="52" rx="20" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        {/* Cross hatches */}
        <path d="M35,40 L65,70 M35,60 L55,80 M45,30 L65,50 M65,40 L35,70 M65,60 L45,80 M55,30 L35,50" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        {/* Sunglasses */}
        <rect x="32" y="42" width="16" height="12" rx="3" fill="#0f172a" />
        <rect x="52" y="42" width="16" height="12" rx="3" fill="#0f172a" />
        <line x1="48" y1="45" x2="52" y2="45" stroke="#0f172a" strokeWidth="3" />
        {/* Smile */}
        <path d="M44,64 C48,68 52,68 56,64" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function PuzzleGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);
  
  // Gameplay states
  const [category, setCategory] = useState("animals"); // "animals" or "fruits"
  const [currentLevel, setCurrentLevel] = useState(null);
  const [solved, setSolved] = useState(false);
  
  // Custom Pointer-Event drag tracking
  const [pieces, setPieces] = useState([]); // List of puzzle pieces with { id, correctX, correctY, currentX, currentY, snapped }
  const [activeDragId, setActiveDragId] = useState(null);
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const boardRef = useRef(null);

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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const selectLevel = (level) => {
    setCurrentLevel(level);
    setSolved(false);
    
    // Create 4-piece jigsaw (2x2 grid)
    // Board is 240x240, each piece is 120x120
    const puzzlePieces = [
      { id: 'top-left', label: 'Top Left', correctX: 0, correctY: 0, viewRect: '0 0 50 50' },
      { id: 'top-right', label: 'Top Right', correctX: 120, correctY: 0, viewRect: '50 0 50 50' },
      { id: 'bottom-left', label: 'Bottom Left', correctX: 0, correctY: 120, viewRect: '0 50 50 50' },
      { id: 'bottom-right', label: 'Bottom Right', correctX: 120, correctY: 120, viewRect: '50 50 50 50' }
    ];

    // Scatter pieces randomly below
    const scattered = puzzlePieces.map((p, idx) => {
      // Scattered positions in a row
      const randomOffset = Math.random() * 20 - 10;
      return {
        ...p,
        currentX: idx * 70 + 10 + randomOffset,
        currentY: 280 + randomOffset,
        snapped: false
      };
    });

    setPieces(scattered);
  };

  useEffect(() => {
    // Select first level of the category initially
    if (activeProfile) {
      const filtered = PUZZLE_LEVELS.filter(l => l.category === category);
      selectLevel(filtered[0]);
    }
  }, [category, activeProfile]);

  // Pointer drag event handlers for absolute touch compatibility
  const handlePointerDown = (e, pieceId) => {
    if (solved) return;
    const piece = pieces.find(p => p.id === pieceId);
    if (piece.snapped) return;

    e.target.setPointerCapture(e.pointerId);
    setActiveDragId(pieceId);

    // Calculate mouse/finger offset from element's top-left coordinates
    const rect = e.target.getBoundingClientRect();
    dragStartOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerMove = (e, pieceId) => {
    if (activeDragId !== pieceId) return;
    if (!boardRef.current) return;

    // Get pointer coordinates relative to the jigsaw container
    const containerRect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - dragStartOffset.current.x;
    const y = e.clientY - containerRect.top - dragStartOffset.current.y;

    // Update piece positions
    setPieces(prev => prev.map(p => p.id === pieceId ? { ...p, currentX: x, currentY: y } : p));
  };

  const handlePointerUp = (e, pieceId) => {
    if (activeDragId !== pieceId) return;
    e.target.releasePointerCapture(e.pointerId);
    setActiveDragId(null);

    const piece = pieces.find(p => p.id === pieceId);
    
    // Physics Snapping logic:
    // If piece is placed within 35px of its correct location, snap it!
    const diffX = Math.abs(piece.currentX - piece.correctX);
    const diffY = Math.abs(piece.currentY - piece.correctY);

    if (diffX < 35 && diffY < 35) {
      // Snap piece into perfect position
      const updatedPieces = pieces.map(p => 
        p.id === pieceId 
          ? { ...p, currentX: p.correctX, currentY: p.correctY, snapped: true } 
          : p
      );
      setPieces(updatedPieces);

      // Check if all pieces snapped
      const allSnapped = updatedPieces.every(p => p.snapped);
      if (allSnapped) {
        setSolved(true);
        updateGlobalScore(20);
        triggerReward();
      }
    }
  };

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  const filteredLevels = PUZZLE_LEVELS.filter(l => l.category === category);

  return (
    <div className="puzzle-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
        </div>
      </div>

      <div className="puzzle-board-layout">
        {/* Side Panel: Level/Theme Selector */}
        <div className="puzzle-side-panel glass-panel">
          <h2 className="panel-title"><Smile size={20} color="#60a5fa" /> Category</h2>
          
          <div className="category-toggles">
            <button 
              className={`cat-btn ${category === 'animals' ? 'active' : ''}`}
              onClick={() => setCategory('animals')}
            >
              Animals 🐾
            </button>
            <button 
              className={`cat-btn ${category === 'fruits' ? 'active' : ''}`}
              onClick={() => setCategory('fruits')}
            >
              Fruits 🍓
            </button>
          </div>

          <h3 className="panel-subtitle">Select Puzzle:</h3>
          <div className="level-grid">
            {filteredLevels.map(lvl => (
              <button 
                key={lvl.id}
                className={`level-card ${currentLevel?.id === lvl.id ? 'active' : ''}`}
                style={{ '--accent': lvl.color }}
                onClick={() => selectLevel(lvl)}
              >
                <div className="level-icon-box">{lvl.svg}</div>
                <span className="level-name">{lvl.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Jigsaw Board */}
        <div className="puzzle-main-board glass-panel">
          <h1 className="board-header">
            {solved ? (
              <span className="solved-title animate-bounce"><Sparkles size={24} color="#10b981" /> MAGICAL WORK! <Sparkles size={24} color="#10b981" /></span>
            ) : (
              <span>Drag the blocks into the right place!</span>
            )}
          </h1>

          <div 
            ref={boardRef} 
            className="jigsaw-board-container"
          >
            {/* The Target board (Empty Grey Outline Slots) */}
            <div className="jigsaw-target-shadow-grid">
              <div className="target-shadow-slot top-left"></div>
              <div className="target-shadow-slot top-right"></div>
              <div className="target-shadow-slot bottom-left"></div>
              <div className="target-shadow-slot bottom-right"></div>
            </div>

            {/* Complete Glowing Overlay when Solved */}
            {solved && currentLevel && (
              <div className="solved-glowing-image bounce-in" style={{ borderColor: currentLevel.color }}>
                {currentLevel.svg}
                <div className="congrats-banner">
                  <h3>{currentLevel.name}!</h3>
                  <p>Keep up the amazing work! (+20 Points)</p>
                </div>
              </div>
            )}

            {/* Draggable Pieces Overlay */}
            {!solved && pieces.map(piece => {
              return (
                <div
                  key={piece.id}
                  className={`jigsaw-draggable-piece ${piece.snapped ? 'snapped' : ''} ${activeDragId === piece.id ? 'dragging' : ''}`}
                  style={{
                    left: `${piece.currentX}px`,
                    top: `${piece.currentY}px`,
                    width: '120px',
                    height: '120px',
                    touchAction: 'none' // Crucial for pointer events on mobile
                  }}
                  onPointerDown={(e) => handlePointerDown(e, piece.id)}
                  onPointerMove={(e) => handlePointerMove(e, piece.id)}
                  onPointerUp={(e) => handlePointerUp(e, piece.id)}
                >
                  {/* Render only the specific quadrant of the target SVG using viewbox cropping */}
                  <svg 
                    viewBox={piece.viewRect} 
                    className="jigsaw-piece-svg"
                    style={{ filter: piece.snapped ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                  >
                    {currentLevel?.svg.props.children}
                  </svg>
                </div>
              );
            })}
          </div>

          {/* Reset button or solved indicator */}
          {solved && (
            <button className="play-again-btn" onClick={() => selectLevel(currentLevel)}>
              <RefreshCw size={18} /> Solve Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
