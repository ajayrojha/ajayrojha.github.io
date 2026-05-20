import React, { useState, useEffect } from 'react';
import { Star, UserPlus, Home } from 'lucide-react';
import './PlayerSelect.css';

export default function PlayerSelect({ onSelectProfile, onBack, storageKey = 'hub-profiles' }) {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setProfiles(JSON.parse(saved));
    }
  }, [storageKey]);

  const saveProfiles = (newProfiles) => {
    setProfiles(newProfiles);
    localStorage.setItem(storageKey, JSON.stringify(newProfiles));
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    const newProfile = { id: Date.now(), name: newProfileName.trim(), score: 0 };
    saveProfiles([...profiles, newProfile]);
    setNewProfileName('');
    onSelectProfile(newProfile);
  };

  return (
    <div className="player-select-container view-enter">
      <h2 className="ps-title">Select Your Player!</h2>
      <div className="profiles-grid">
        {profiles.map(p => (
          <div key={p.id} className="profile-card" onClick={() => onSelectProfile(p)}>
            <div className="profile-avatar"><Star size={40} fill="#f59e0b" color="#f59e0b" /></div>
            <h3>{p.name}</h3>
            <p>Score: {p.score}</p>
          </div>
        ))}
        
        <div className="profile-card new-profile">
          <div className="profile-avatar"><UserPlus size={40} color="#3b82f6" /></div>
          <form onSubmit={handleAddProfile}>
            <input 
              type="text" 
              placeholder="New Player Name" 
              value={newProfileName}
              onChange={e => setNewProfileName(e.target.value)}
              maxLength={12}
            />
            <button type="submit" disabled={!newProfileName.trim()}>Start Game</button>
          </form>
        </div>
      </div>
      <button className="ps-back-btn" onClick={onBack}>
        <Home size={20} /> Back to Hub
      </button>
    </div>
  );
}
