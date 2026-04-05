import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

const SiteSettingsContext = createContext({});

export const useSiteSettings = () => useContext(SiteSettingsContext);

const defaults = {
  artist_name: 'ARTIST_NAME',
  artist_photo_url: '',
  artist_bio_1: 'I am a passionate Indian artist specializing in watercolor and acrylic paintings. My work draws inspiration from nature, emotions, and the vibrant colors of Indian culture.',
  artist_bio_2: 'With over 10 years of experience, I conduct workshops for beginners and intermediate artists — both online and in-person — helping students discover their creative voice.',
  paintings_count: '200+',
  students_count: '1500+',
  workshops_count: '80+',
  whatsapp_number: '91XXXXXXXXXX',
  email: 'hello@artistname.com',
  instagram: '@artistname',
  location: 'Hyderabad, India',
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data?.length > 0) {
        const map = {};
        data.forEach(row => { if (row.value) map[row.key] = row.value; });
        setSettings(prev => ({ ...prev, ...map }));
      }
      setLoading(false);
    })();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, setSettings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
