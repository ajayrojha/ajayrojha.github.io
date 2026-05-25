import React, { useState } from 'react';
import { LayoutGrid, Gamepad2, ArrowLeft, TrendingUp, Wind, Calculator, Puzzle, Earth, Sparkles, Zap } from 'lucide-react';
import MathGame from './MathGame';
import ShapeGame from './ShapeGame';
import GeographyGame from './GeographyGame';
import PuzzleGame from './PuzzleGame';
import BlockStackGame from './BlockStackGame';

export default function App() {
  const [currentView, setCurrentView] = useState('HOME');

  const renderHome = () => (
    <div className="card-grid view-enter">
      <div className="glass-card card-apps" onClick={() => setCurrentView('APPS')}>
        <div className="icon-wrapper">
          <LayoutGrid size={40} strokeWidth={1.5} />
        </div>
        <h2>Apps</h2>
        <p>Explore productivity, health, and finance applications.</p>
      </div>

      <div className="glass-card card-games" onClick={() => setCurrentView('GAMES')}>
        <div className="icon-wrapper">
          <Gamepad2 size={40} strokeWidth={1.5} />
        </div>
        <h2>Games</h2>
        <p>Fun and educational games for the kids.</p>
      </div>
    </div>
  );

  const renderApps = () => (
    <div className="card-grid view-enter">
      <a href="https://ajayrojha.github.io/Stockmonitor/" className="glass-card card-stock" target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">
          <TrendingUp size={40} strokeWidth={1.5} />
        </div>
        <h2>Stock Monitor</h2>
        <p>Real-time stock tracking and predictive trading options.</p>
      </a>

      <a href="https://ajayrojha.github.io/box-breathing/" className="glass-card card-breathe" target="_blank" rel="noopener noreferrer">
        <div className="icon-wrapper">
          <Wind size={40} strokeWidth={1.5} />
        </div>
        <h2>Box Breathing</h2>
        <p>A calming exercise to help relax your central nervous system.</p>
      </a>
    </div>
  );

  const renderGames = () => (
    <div className="card-grid view-enter">
      <div className="glass-card card-math" onClick={() => setCurrentView('MATH_GAME')}>
        <div className="icon-wrapper">
          <Calculator size={40} strokeWidth={1.5} />
        </div>
        <h2>Math Adventures</h2>
        <p>For the 7-year old! Solve fun math puzzles in space.</p>
        <span className="game-age-badge math-badge">Age 7+</span>
      </div>

      <div className="glass-card card-puzzle" onClick={() => setCurrentView('SHAPE_GAME')}>
        <div className="icon-wrapper">
          <Puzzle size={40} strokeWidth={1.5} />
        </div>
        <h2>Shape Sorter</h2>
        <p>Play and learn with colors, shapes, and patterns!</p>
        <span className="game-age-badge shape-badge">Age 4+</span>
      </div>

      <div className="glass-card card-apps" onClick={() => setCurrentView('GEO_GAME')}>
        <div className="icon-wrapper">
          <Earth size={40} strokeWidth={1.5} />
        </div>
        <h2>Countries &amp; Continents</h2>
        <p>Explore the world, learn about artifacts, maps, and cultures!</p>
        <span className="game-age-badge geo-badge">Age 8+</span>
      </div>

      <div className="glass-card card-puzzle-mania" onClick={() => setCurrentView('PUZZLE_GAME')}>
        <div className="icon-wrapper">
          <Sparkles size={40} strokeWidth={1.5} />
        </div>
        <h2>Puzzle Mania</h2>
        <p>Drag &amp; drop fun! Match animals and fruits in magical jigsaw puzzles.</p>
        <span className="game-age-badge puzzle-badge">Age 4–5</span>
      </div>

      <div className="glass-card card-stacker" onClick={() => setCurrentView('STACK_GAME')}>
        <div className="icon-wrapper">
          <Zap size={40} strokeWidth={1.5} />
        </div>
        <h2>Block Stacker</h2>
        <p>Neon arcade action! Stack glowing blocks and climb the leaderboard.</p>
        <span className="game-age-badge stack-badge">Age 12+</span>
      </div>
    </div>
  );

  // Full-screen game routing (no shell header needed)
  if (currentView === 'MATH_GAME') {
    return <MathGame onBack={() => setCurrentView('GAMES')} />;
  }
  if (currentView === 'SHAPE_GAME') {
    return <ShapeGame onBack={() => setCurrentView('GAMES')} />;
  }
  if (currentView === 'GEO_GAME') {
    return <GeographyGame onBack={() => setCurrentView('GAMES')} />;
  }
  if (currentView === 'PUZZLE_GAME') {
    return <PuzzleGame onBack={() => setCurrentView('GAMES')} />;
  }
  if (currentView === 'STACK_GAME') {
    return <BlockStackGame onBack={() => setCurrentView('GAMES')} />;
  }

  let title = 'Welcome Hub';
  let subtitle = 'Select a category to get started';
  let content = renderHome();

  if (currentView === 'APPS') {
    title = 'Applications';
    subtitle = 'Your custom tools and utilities';
    content = renderApps();
  } else if (currentView === 'GAMES') {
    title = 'Games';
    subtitle = 'Fun activities for every age in the family';
    content = renderGames();
  }

  return (
    <div className="app-container">
      <header>
        <div className="logo" onClick={() => setCurrentView('HOME')}>
          ajayrojha
        </div>
        {currentView !== 'HOME' && (
          <button className="back-btn" onClick={() => setCurrentView('HOME')}>
            <ArrowLeft size={18} />
            Back to Hub
          </button>
        )}
      </header>

      <main className="main-content">
        <h1 className="title" key={`${currentView}-title`}>{title}</h1>
        <p className="subtitle" key={`${currentView}-subtitle`}>{subtitle}</p>
        
        {content}
      </main>
    </div>
  );
}
