import { useState, useEffect } from 'react';
import { getLocal, DEFAULT_PROFILE } from './storage';

export function useProfile() {
  const [profile, setProfile] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...getLocal('artistProfile', {}),
  }));

  useEffect(() => {
    const sync = () => setProfile({ ...DEFAULT_PROFILE, ...getLocal('artistProfile', {}) });
    window.addEventListener('profileUpdated', sync);
    return () => window.removeEventListener('profileUpdated', sync);
  }, []);

  return profile;
}
