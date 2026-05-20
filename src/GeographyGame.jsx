import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './GeographyGame.css';
import { Trophy, ArrowLeft, Earth } from 'lucide-react';
import PlayerSelect from './components/PlayerSelect';
import { ImageStore } from './assets/ImageStore';

const DATA = [
  {
    country: "France",
    image: ImageStore.france_jpg,
    artifact: "Eiffel Tower",
    explanation: "The Eiffel Tower was built in Paris in 1889! It was originally criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France."
  },
  {
    country: "Egypt",
    image: ImageStore.egypt_jpg,
    artifact: "The Great Pyramids of Giza",
    explanation: "These ancient pyramids were built as tombs for the country's pharaohs over 4,500 years ago during the Old Kingdom period. The Great Pyramid is the oldest of the Seven Wonders of the Ancient World!"
  },
  {
    country: "Japan",
    image: ImageStore.japan_jpg,
    artifact: "Mount Fuji",
    explanation: "Mount Fuji is an active stratovolcano and the highest mountain in Japan, standing 3,776 meters tall. It's considered one of Japan's three sacred mountains and has inspired artists for centuries."
  },
  {
    country: "India",
    image: ImageStore.india_jpg,
    artifact: "Taj Mahal",
    explanation: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal."
  },
  {
    country: "Brazil",
    image: ImageStore.brazil_jpg,
    artifact: "Christ the Redeemer",
    explanation: "This colossal Art Deco statue of Jesus Christ is located in Rio de Janeiro, standing 30 meters tall, not including its 8-meter pedestal. Its arms stretch 28 meters wide!"
  },
  {
    country: "Australia",
    image: ImageStore.australia_jpg,
    artifact: "Sydney Opera House",
    explanation: "Opened in 1973, this multi-venue performing arts center is one of the 20th century's most famous and distinctive buildings, with its roof modeled after the sails of a ship."
  },
  {
    country: "China",
    image: ImageStore.china_jpg,
    artifact: "The Great Wall of China",
    explanation: "The Great Wall is a series of fortifications that were built across the historical northern borders of ancient Chinese states to protect their territories. It is actually made of many overlapping walls!"
  },
  {
    country: "United States",
    image: ImageStore.usa_jpg,
    artifact: "Statue of Liberty",
    explanation: "The Statue of Liberty was a gift of friendship from the people of France to the United States and is recognized as a universal symbol of freedom and democracy."
  }
];

const ALL_COUNTRIES = [
  'France', 'Egypt', 'Japan', 'India', 'Brazil', 'Australia', 'China', 'United States', 
  'Italy', 'Mexico', 'Canada', 'United Kingdom', 'Peru', 'South Africa'
];

export default function GeographyGame({ onBack }) {
  const [activeProfile, setActiveProfile] = useState(null);
  
  const [currentArtifact, setCurrentArtifact] = useState(null);
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
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const generateRound = () => {
    // Pick random artifact
    let item = DATA[Math.floor(Math.random() * DATA.length)];
    // Make sure it doesn't repeat immediately if possible
    if (currentArtifact && currentArtifact.artifact === item.artifact) {
       item = DATA[(DATA.indexOf(item) + 1) % DATA.length];
    }
    
    // Pick distractors
    let distractors = ALL_COUNTRIES.filter(c => c !== item.country);
    distractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const finalOptions = [item.country, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentArtifact(item);
    setOptions(finalOptions);
    setFeedback(null);
  };

  useEffect(() => {
    if (activeProfile && !currentArtifact) generateRound();
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
  }

  if (!activeProfile) {
    return <PlayerSelect onSelectProfile={setActiveProfile} onBack={onBack} />;
  }

  return (
    <div className="geo-container view-enter">
      <div className="math-header">
        <button className="math-small-btn" onClick={() => setActiveProfile(null)}>
          <ArrowLeft size={16} /> Switch Player
        </button>
        <div className="math-stats">
          <div className="stat-pill"><Trophy size={16} color="#f59e0b" /> Score: {activeProfile?.score}</div>
        </div>
      </div>

      <div className="geo-board">
        <h1 className="geo-title"><Earth size={36} color="#3b82f6" /> World Explorer</h1>
        <p className="geo-subtitle">Can you guess which country this is from?</p>

        {currentArtifact && (
          <div className="artifact-frame">
            <img src={currentArtifact.image} alt="Artifact" className="artifact-image" />
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
              <h3>{currentArtifact.artifact}</h3>
              <p>{currentArtifact.explanation}</p>
            </div>
            <button className="next-btn" onClick={nextQuestion}>Next Artifact</button>
          </div>
        )}

        {feedback === 'INCORRECT' && (
           <div className="geo-feedback incorrect shake">
             <h2>Not quite! Let's examine another one together.</h2>
             <button className="next-btn" onClick={nextQuestion} style={{marginTop: '2rem'}}>Move On</button>
           </div>
        )}

      </div>
    </div>
  );
}
