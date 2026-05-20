import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './ShapeGame.css';
import { Trophy, ArrowLeft, Circle, Square, Triangle, Hexagon, Star } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';

const SHAPES = [
  { id: 'circle', component: Circle, color: '#ef4444' }, // Red
  { id: 'square', component: Square, color: '#3b82f6' }, // Blue
  { id: 'triangle', component: Triangle, color: '#f59e0b' }, // Yellow
  { id: 'hexagon', component: Hexagon, color: '#10b981' }, // Green
  { id: 'star', component: Star, color: '#8b5cf6' } // Purple
];

export default function ShapeGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);
  
  const [targetShape, setTargetShape] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const generateRound = () => {
    const shuffledShapes = [...SHAPES].sort(() => 0.5 - Math.random());
    const selectedOptions = shuffledShapes.slice(0, 3);
    const target = selectedOptions[Math.floor(Math.random() * 3)];
    
    setTargetShape({ ...target, color: '#475569' }); // Target is gray to act as a "hole"
    setOptions(selectedOptions);
    setFeedback(null);
  };

  useEffect(() => {
    if (activeProfile && !targetShape) generateRound();
  }, [activeProfile]);

  const handleShapeTap = (shape) => {
    if (feedback) return; // Prevent multiple taps

    if (shape.id === targetShape.id) {
      setFeedback('CORRECT');
      updateGlobalScore(10);
      triggerReward();
      setTimeout(generateRound, 2000);
    } else {
      setFeedback('INCORRECT');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  const TargetIcon = targetShape?.component;

  return (
    <div className="shape-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
        </div>
      </div>

      <div className="shape-board">
        <h1 className="shape-prompt">Tap the block that goes in the hole!</h1>
        
        {targetShape && (
          <div className="target-zone">
            <TargetIcon size={180} color={targetShape.color} strokeWidth={1} style={{ opacity: 0.3 }} />
          </div>
        )}

        {feedback === 'CORRECT' && <div className="shape-feedback correct">Great Job!</div>}
        {feedback === 'INCORRECT' && <div className="shape-feedback incorrect shake">Keep Trying!</div>}

        <div className="options-zone">
          {options.map((shape) => {
            const Icon = shape.component;
            return (
              <button 
                key={shape.id} 
                className="shape-block"
                style={{ backgroundColor: shape.color }}
                onClick={() => handleShapeTap(shape)}
              >
                 <Icon size={100} color="#fff" fill="#fff" strokeWidth={0} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
