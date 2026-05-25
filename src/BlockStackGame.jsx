import React, { useState, useEffect, useRef } from 'react';
import './BlockStackGame.css';
import { Trophy, ArrowLeft, Play, RotateCw, ArrowLeftCircle, ArrowRightCircle, ArrowDownCircle, Zap, Star } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

// Tetrimino shapes and neon color profiles
const TETRIMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: '#06b6d4' }, // Neon Cyan
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' }, // Neon Blue
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' }, // Neon Orange
  O: { shape: [[1, 1], [1, 1]], color: '#eab308' }, // Neon Yellow
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#10b981' }, // Neon Green
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#8b5cf6' }, // Neon Purple
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' }  // Neon Red
};

const SHAPES_KEYS = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 26; // px size on canvas

export default function BlockStackGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);

  // Gameplay State
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // Canvas Refs & Game loop trackers
  const canvasRef = useRef(null);
  const nextCanvasRef = useRef(null);
  const board = useRef(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  
  const currentPiece = useRef(null);
  const nextPiece = useRef(null);
  
  const lastTime = useRef(0);
  const dropCounter = useRef(0);
  const dropInterval = useRef(800); // 800ms start tick rate

  // Synchronization profile score directly
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

  // Load High Scores from Local Storage
  const loadLeaderboard = () => {
    const saved = localStorage.getItem('hub-block-stack-scores');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    } else {
      // Seed dummy neon high scores
      const initialScores = [
        { name: 'AlphaStacker', score: 5000, level: 5, date: '2026-05-18' },
        { name: 'NeonGrid', score: 3200, level: 3, date: '2026-05-19' },
        { name: 'iPadKing', score: 1800, level: 2, date: '2026-05-20' }
      ];
      localStorage.setItem('hub-block-stack-scores', JSON.stringify(initialScores));
      setLeaderboard(initialScores);
    }
  };

  const saveHighScore = (finalScore) => {
    if (!activeProfile || finalScore <= 0) return;
    
    const saved = localStorage.getItem('hub-block-stack-scores') || '[]';
    const currentScores = JSON.parse(saved);
    
    const newEntry = {
      name: activeProfile.name,
      score: finalScore,
      level: level,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [...currentScores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Keep top 5

    localStorage.setItem('hub-block-stack-scores', JSON.stringify(updated));
    setLeaderboard(updated);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  // Generate random Tetrimino
  const getRandomPiece = () => {
    const key = SHAPES_KEYS[Math.floor(Math.random() * SHAPES_KEYS.length)];
    const piece = TETRIMINOS[key];
    return {
      shape: piece.shape,
      color: piece.color,
      x: Math.floor((COLS - piece.shape[0].length) / 2),
      y: 0
    };
  };

  const startGame = () => {
    board.current = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPlaying(true);
    
    dropInterval.current = 800;
    currentPiece.current = getRandomPiece();
    nextPiece.current = getRandomPiece();
    lastTime.current = 0;
    dropCounter.current = 0;
  };

  // Matrix Collision detection
  const checkCollision = (piece, offsetX = 0, offsetY = 0) => {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const nextX = piece.x + c + offsetX;
          const nextY = piece.y + r + offsetY;

          if (nextX < 0 || nextX >= COLS || nextY >= ROWS) {
            return true;
          }
          if (nextY >= 0 && board.current[nextY][nextX]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Merge block into grid matrix
  const mergePiece = () => {
    const piece = currentPiece.current;
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const boardY = piece.y + r;
          const boardX = piece.x + c;
          if (boardY >= 0) {
            board.current[boardY][boardX] = piece.color;
          }
        }
      }
    }
  };

  // Clear filled horizontal lines & award multipliers
  const clearLines = () => {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board.current[r].every(val => val !== 0)) {
        board.current.splice(r, 1);
        board.current.unshift(Array(COLS).fill(0));
        cleared++;
        r++; // Check same row index again after splice
      }
    }

    if (cleared > 0) {
      const lineScores = [0, 100, 300, 500, 800]; // 1, 2, 3, 4 lines cleared
      const award = (lineScores[cleared] || 1000) * level;
      setScore(prev => prev + award);
      
      const newLines = lines + cleared;
      setLines(newLines);

      // Level up every 10 lines
      const nextLvl = Math.floor(newLines / 10) + 1;
      if (nextLvl > level) {
        setLevel(nextLvl);
        dropInterval.current = Math.max(100, 800 - (nextLvl - 1) * 75); // Speed increases
      }

      // Sync active profile's global score
      updateGlobalScore(Math.floor(award / 5)); // Give 20% of block stack score as learning hub profile score!
    }
  };

  // Tetrimino Rotation
  const rotatePiece = () => {
    const piece = currentPiece.current;
    const n = piece.shape.length;
    const m = piece.shape[0].length;
    
    // Transpose and reverse rows
    const rotatedShape = Array.from({ length: m }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        rotatedShape[c][n - 1 - r] = piece.shape[r][c];
      }
    }

    const rotatedPiece = { ...piece, shape: rotatedShape };
    
    let shift = 0;
    if (checkCollision(rotatedPiece)) {
      if (!checkCollision(rotatedPiece, -1, 0)) shift = -1;
      else if (!checkCollision(rotatedPiece, 1, 0)) shift = 1;
      else if (!checkCollision(rotatedPiece, -2, 0)) shift = -2;
      else if (!checkCollision(rotatedPiece, 2, 0)) shift = 2;
    }

    if (!checkCollision(rotatedPiece, shift, 0)) {
      piece.shape = rotatedShape;
      piece.x += shift;
    }
  };

  // Drop element one tick down
  const dropPiece = () => {
    const piece = currentPiece.current;
    if (!checkCollision(piece, 0, 1)) {
      piece.y += 1;
    } else {
      mergePiece();
      clearLines();
      
      // Check Game Over condition
      if (piece.y <= 0) {
        setGameOver(true);
        setIsPlaying(false);
        saveHighScore(score);
        return;
      }

      // Load next piece
      currentPiece.current = nextPiece.current;
      nextPiece.current = getRandomPiece();
    }
  };

  // Hard drop (drop to bottom instantly)
  const hardDropPiece = () => {
    const piece = currentPiece.current;
    while (!checkCollision(piece, 0, 1)) {
      piece.y += 1;
    }
    mergePiece();
    clearLines();
    
    if (piece.y <= 0) {
      setGameOver(true);
      setIsPlaying(false);
      saveHighScore(score);
      return;
    }
    currentPiece.current = nextPiece.current;
    nextPiece.current = getRandomPiece();
  };

  // Canvas drawing: 60fps Loop
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background matrix grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
    ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * BLOCK_SIZE, 0);
      ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      ctx.stroke();
    }

    // Draw merged blocks inside board matrix
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const color = board.current[r][c];
        if (color) {
          drawBlock(ctx, c, r, color);
        }
      }
    }

    // Draw active current falling piece
    if (currentPiece.current) {
      const { shape, color, x, y } = currentPiece.current;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            drawBlock(ctx, x + c, y + r, color);
          }
        }
      }
    }
  };

  // Draw single block with glass/neon visual border glow
  const drawBlock = (ctx, x, y, color) => {
    const posX = x * BLOCK_SIZE;
    const posY = y * BLOCK_SIZE;

    // Outer glow highlight
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    
    // Draw rounded block
    ctx.beginPath();
    ctx.roundRect(posX + 1, posY + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2, 4);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Glass sheen light reflect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.roundRect(posX + 3, posY + 3, BLOCK_SIZE - 6, 4, 1);
    ctx.fill();
  };

  // Next Piece Canvas preview draw
  const drawNextPreview = () => {
    const canvas = nextCanvasRef.current;
    if (!canvas || !nextPiece.current) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { shape, color } = nextPiece.current;
    const boxSize = 20; // smaller preview size
    const offsetX = (canvas.width - shape[0].length * boxSize) / 2;
    const offsetY = (canvas.height - shape.length * boxSize) / 2;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const posX = offsetX + c * boxSize;
          const posY = offsetY + r * boxSize;

          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(posX + 1, posY + 1, boxSize - 2, boxSize - 2, 3);
          ctx.fill();
        }
      }
    }
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

  // Main 60fps requestAnimationFrame Game Loop
  useEffect(() => {
    let animationId;

    const gameLoop = (time = 0) => {
      if (!isPlaying || gameOver) return;

      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      dropCounter.current += deltaTime;
      if (dropCounter.current >= dropInterval.current) {
        dropPiece();
        dropCounter.current = 0;
      }

      drawGame();
      drawNextPreview();
      
      animationId = requestAnimationFrame(gameLoop);
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(gameLoop);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, gameOver]);

  // Touch and Keyboard Controls mapping
  const handleKeyDown = (e) => {
    if (!isPlaying || gameOver) return;
    
    if (e.key === 'ArrowLeft') {
      if (!checkCollision(currentPiece.current, -1, 0)) currentPiece.current.x -= 1;
    } else if (e.key === 'ArrowRight') {
      if (!checkCollision(currentPiece.current, 1, 0)) currentPiece.current.x += 1;
    } else if (e.key === 'ArrowDown') {
      dropPiece();
    } else if (e.key === 'ArrowUp') {
      rotatePiece();
    } else if (e.key === ' ') {
      hardDropPiece();
    }
    
    drawGame();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  return (
    <div className="stack-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
        </div>
      </div>

      <div className="stack-board-layout">
        {/* Jigsaw Canvas Game Board */}
        <div className="stack-main-canvas glass-panel neon-blue-glow">
          <canvas 
            ref={canvasRef} 
            width={COLS * BLOCK_SIZE} 
            height={ROWS * BLOCK_SIZE}
            className="matrix-canvas"
          />

          {!isPlaying && !gameOver && (
            <div className="start-overlay bounce-in">
              <Zap size={48} className="text-yellow-glow" />
              <h2>NEON BLOCK STACK</h2>
              <p>Match blocks, clear rows, and conquer the glowing leaderboard matrix!</p>
              <button className="stack-btn start-btn" onClick={startGame}>
                <Play size={20} fill="currentColor" /> START ARCADE
              </button>
            </div>
          )}

          {gameOver && (
            <div className="start-overlay bounce-in">
              <Trophy size={48} className="text-orange-500 animate-bounce" />
              <h2 className="text-red-glow">GAME OVER</h2>
              <p>Spectacular performance! You reached Level {level} with a score of {score}!</p>
              <button className="stack-btn start-btn" onClick={startGame}>
                <Play size={20} fill="currentColor" /> PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Sidebar panels: Next preview, active stats, and leaderboard */}
        <div className="stack-sidebar">
          {/* Next Preview */}
          <div className="stack-card glass-panel">
            <h3 className="card-title">NEXT BLOCK</h3>
            <canvas ref={nextCanvasRef} width={100} height={70} className="preview-canvas" />
          </div>

          {/* Active stats */}
          <div className="stack-card glass-panel text-center">
            <h3 className="card-title">ARCADE STATS</h3>
            <div className="arcade-stat-row">
              <span>SCORE</span>
              <span className="arcade-stat-val text-yellow-400">{score}</span>
            </div>
            <div className="arcade-stat-row">
              <span>LEVEL</span>
              <span className="arcade-stat-val text-cyan-400">{level}</span>
            </div>
            <div className="arcade-stat-row">
              <span>ROWS CLEARED</span>
              <span className="arcade-stat-val text-emerald-400">{lines}</span>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="stack-card glass-panel">
            <h3 className="card-title"><Star size={16} color="#f59e0b" fill="#f59e0b" /> HIGH SCORES</h3>
            <div className="leader-board-list">
              {leaderboard.map((entry, idx) => (
                <div key={idx} className="leader-row">
                  <span className="leader-num">#{idx + 1}</span>
                  <span className="leader-name">{entry.name}</span>
                  <span className="leader-score">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* On-Screen Touch Controls (Optimized for iPad players!) */}
      {isPlaying && !gameOver && (
        <div className="touch-controls-pane slide-up">
          <button className="touch-btn" onClick={() => {
            if (!checkCollision(currentPiece.current, -1, 0)) currentPiece.current.x -= 1;
            drawGame();
          }}>
            <ArrowLeftCircle size={36} />
          </button>
          <button className="touch-btn" onClick={rotatePiece}>
            <RotateCw size={36} />
          </button>
          <button className="touch-btn" onClick={() => {
            if (!checkCollision(currentPiece.current, 1, 0)) currentPiece.current.x += 1;
            drawGame();
          }}>
            <ArrowRightCircle size={36} />
          </button>
          <button className="touch-btn" onClick={() => {
            dropPiece();
            drawGame();
          }}>
            <ArrowDownCircle size={36} />
          </button>
          <button className="touch-btn hard-drop-btn" onClick={() => {
            hardDropPiece();
            drawGame();
          }}>
            DROP!
          </button>
        </div>
      )}
    </div>
  );
}
