import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './PuzzleGame.css';
import { Trophy, ArrowLeft, Heart, Sparkles, Smile, RefreshCw } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

// Puzzle Themes & SVG Assets
// 50 unique animal templates with cute emojis & vibrant colors
const ANIMAL_TEMPLATES = [
  { name: 'Happy Panda', emoji: '🐼', color: '#10b981' },
  { name: 'Sleeping Fox', emoji: '🦊', color: '#fb923c' },
  { name: 'Friendly Lion', emoji: '🦁', color: '#facc15' },
  { name: 'Cute Koala', emoji: '🐨', color: '#94a3b8' },
  { name: 'Little Piggy', emoji: '🐷', color: '#f472b6' },
  { name: 'Fluffy Bunny', emoji: '🐰', color: '#fb7185' },
  { name: 'Wise Owl', emoji: '🦉', color: '#a78bfa' },
  { name: 'Playful Puppy', emoji: '🐶', color: '#fbbf24' },
  { name: 'Sleepy Kitty', emoji: '🐱', color: '#f43f5e' },
  { name: 'Happy Frog', emoji: '🐸', color: '#4ade80' },
  { name: 'Little Monkey', emoji: '🐵', color: '#b45309' },
  { name: 'Baby Penguin', emoji: '🐧', color: '#38bdf8' },
  { name: 'Slow Turtle', emoji: '🐢', color: '#22c55e' },
  { name: 'Majestic Tiger', emoji: '🐯', color: '#f97316' },
  { name: 'Golden Chick', emoji: '🐥', color: '#eab308' },
  { name: 'Cute Duckling', emoji: '🦆', color: '#fbbf24' },
  { name: 'Happy Hamster', emoji: '🐹', color: '#fb923c' },
  { name: 'Sweet Mouse', emoji: '🐭', color: '#a3a3a3' },
  { name: 'Little Bear', emoji: '🐻', color: '#a16207' },
  { name: 'Cool Unicorn', emoji: '🦄', color: '#ec4899' },
  { name: 'Gentle Elephant', emoji: '🐘', color: '#64748b' },
  { name: 'Tall Giraffe', emoji: '🦒', color: '#facc15' },
  { name: 'Striped Zebra', emoji: '🦓', color: '#475569' },
  { name: 'Spotted Deer', emoji: '🦌', color: '#b45309' },
  { name: 'Fluffy Sheep', emoji: '🐑', color: '#cbd5e1' },
  { name: 'Friendly Cow', emoji: '🐮', color: '#f1f5f9' },
  { name: 'Happy Horse', emoji: '🐴', color: '#854d0e' },
  { name: 'Busy Bee', emoji: '🐝', color: '#eab308' },
  { name: 'Pretty Butterfly', emoji: '🦋', color: '#06b6d4' },
  { name: 'Ladybug Friend', emoji: '🐞', color: '#ef4444' },
  { name: 'Cute Snail', emoji: '🐌', color: '#fbbf24' },
  { name: 'Friendly Shark', emoji: '🦈', color: '#3b82f6' },
  { name: 'Little Dolphin', emoji: '🐬', color: '#67e8f9' },
  { name: 'Starfish Buddy', emoji: '⭐', color: '#fb7185' },
  { name: 'Cool Octopus', emoji: '🐙', color: '#f43f5e' },
  { name: 'Tropical Fish', emoji: '🐠', color: '#f97316' },
  { name: 'Happy Whale', emoji: '🐳', color: '#0284c7' },
  { name: 'Fluffy Chick', emoji: '🐤', color: '#fef08a' },
  { name: 'Wise Turtle', emoji: '🐢', color: '#16a34a' },
  { name: 'Baby Dino', emoji: '🦕', color: '#0d9488' },
  { name: 'Silly Llama', emoji: '🦙', color: '#cbd5e1' },
  { name: 'Lazy Sloth', emoji: '🦥', color: '#7c2d12' },
  { name: 'Fluffy Koala', emoji: '🐨', color: '#94a3b8' },
  { name: 'Little Fox', emoji: '🦊', color: '#ea580c' },
  { name: 'Baby Lion', emoji: '🦁', color: '#fbbf24' },
  { name: 'Panda Cub', emoji: '🐼', color: '#475569' },
  { name: 'Tiny Squirrel', emoji: '🐿️', color: '#d97706' },
  { name: 'Wise Owl', emoji: '🦉', color: '#8b5cf6' },
  { name: 'Green Frog', emoji: '🐸', color: '#22c55e' }
];

// 50 unique fruit & sweet templates with tasty emojis & colors
const FRUIT_TEMPLATES = [
  { name: 'Sweet Strawberry', emoji: '🍓', color: '#f87171' },
  { name: 'Happy Watermelon', emoji: '🍉', color: '#4ade80' },
  { name: 'Cool Pineapple', emoji: '🍍', color: '#fbbf24' },
  { name: 'Red Apple', emoji: '🍎', color: '#ef4444' },
  { name: 'Green Apple', emoji: '🍏', color: '#22c55e' },
  { name: 'Ripe Banana', emoji: '🍌', color: '#eab308' },
  { name: 'Sweet Cherry', emoji: '🍒', color: '#f43f5e' },
  { name: 'Juicy Peach', emoji: '🍑', color: '#fb923c' },
  { name: 'Purple Grapes', emoji: '🍇', color: '#a855f7' },
  { name: 'Tangy Lemon', emoji: '🍋', color: '#facc15' },
  { name: 'Zesty Lime', emoji: '🥝', color: '#a7f3d0' },
  { name: 'Fresh Orange', emoji: '🍊', color: '#f97316' },
  { name: 'Juicy Pear', emoji: '🍐', color: '#a3e635' },
  { name: 'Yummy Plum', emoji: '🍑', color: '#c084fc' },
  { name: 'Fresh Kiwi', emoji: '🥝', color: '#84cc16' },
  { name: 'Sweet Mango', emoji: '🥭', color: '#fbbf24' },
  { name: 'Red Tomato', emoji: '🍅', color: '#ef4444' },
  { name: 'Sweet Melon', emoji: '🍈', color: '#86efac' },
  { name: 'Fresh Coconut', emoji: '🥥', color: '#78350f' },
  { name: 'Tropical Papaya', emoji: '🥭', color: '#fb923c' },
  { name: 'Sweet Blueberry', emoji: '🫐', color: '#3b82f6' },
  { name: 'Red Raspberry', emoji: '🍓', color: '#ec4899' },
  { name: 'Fresh Avocado', emoji: '🥑', color: '#10b981' },
  { name: 'Bell Pepper', emoji: '🫑', color: '#22c55e' },
  { name: 'Sweet Corn', emoji: '🌽', color: '#eab308' },
  { name: 'Orange Carrot', emoji: '🥕', color: '#f97316' },
  { name: 'Hot Chili', emoji: '🌶️', color: '#dc2626' },
  { name: 'Tasty Potato', emoji: '🥔', color: '#a16207' },
  { name: 'Golden Honey', emoji: '🍯', color: '#fbbf24' },
  { name: 'Magic Mushroom', emoji: '🍄', color: '#ef4444' },
  { name: 'Crunchy Peanut', emoji: '🥜', color: '#d97706' },
  { name: 'Sweet Chestnut', emoji: '🌰', color: '#78350f' },
  { name: 'Tasty Fig', emoji: '🍇', color: '#6b21a8' },
  { name: 'Olive Green', emoji: '🫒', color: '#65a30d' },
  { name: 'Fresh Broccoli', emoji: '🥦', color: '#15803d' },
  { name: 'Cabbage Leaf', emoji: '🥬', color: '#22c55e' },
  { name: 'Hot Garlic', emoji: '🧄', color: '#f1f5f9' },
  { name: 'Sweet Onion', emoji: '🧅', color: '#c084fc' },
  { name: 'Crunchy Cookie', emoji: '🍪', color: '#b45309' },
  { name: 'Birthday Cake', emoji: '🍰', color: '#f472b6' },
  { name: 'Rainbow Candy', emoji: '🍬', color: '#f43f5e' },
  { name: 'Sweet Chocolate', emoji: '🍫', color: '#7c2d12' },
  { name: 'Cool Ice Cream', emoji: '🍦', color: '#cbd5e1' },
  { name: 'Donut Glaze', emoji: '🍩', color: '#db2777' },
  { name: 'Fresh Cupcake', emoji: '🧁', color: '#ec4899' },
  { name: 'Golden Waffle', emoji: '🧇', color: '#d97706' },
  { name: 'Buttery Popcorn', emoji: '🍿', color: '#fbbf24' },
  { name: 'Glass Juice', emoji: '🍹', color: '#38bdf8' },
  { name: 'Sweet BubbleTea', emoji: '🧋', color: '#b45309' },
  { name: 'Tasty Lollipop', emoji: '🍭', color: '#f43f5e' }
];

const buildLevels = () => {
  const levels = [];

  ANIMAL_TEMPLATES.forEach((tmpl, i) => {
    levels.push({
      id: `animal-${i}`,
      category: 'animals',
      name: tmpl.name,
      color: tmpl.color,
      svg: (
        <svg viewBox="0 0 100 100" className="puzzle-svg">
          <defs>
            <radialGradient id={`grad-animal-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={tmpl.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill={`url(#grad-animal-${i})`} stroke={tmpl.color} strokeWidth="3" />
          <text x="50" y="58" fontSize="46" textAnchor="middle" dominantBaseline="middle" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {tmpl.emoji}
          </text>
        </svg>
      )
    });
  });

  FRUIT_TEMPLATES.forEach((tmpl, i) => {
    levels.push({
      id: `fruit-${i}`,
      category: 'fruits',
      name: tmpl.name,
      color: tmpl.color,
      svg: (
        <svg viewBox="0 0 100 100" className="puzzle-svg">
          <defs>
            <radialGradient id={`grad-fruit-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={tmpl.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill={`url(#grad-fruit-${i})`} stroke={tmpl.color} strokeWidth="3" />
          <text x="50" y="58" fontSize="46" textAnchor="middle" dominantBaseline="middle" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
            {tmpl.emoji}
          </text>
        </svg>
      )
    });
  });

  return levels;
};

const PUZZLE_LEVELS = buildLevels();;

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
