// localStorage helpers

export const getLocal = (key, fallback = null) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch { return fallback; }
};

export const setLocal = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { console.error('localStorage save failed:', e); return false; }
};

export const removeLocal = (key) => {
  try { localStorage.removeItem(key); } catch {}
};

// Compress + convert image file to base64 (max 800px, 80% quality)
export const imageToBase64 = (file, maxSize = 800) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) { height = Math.round((height / width) * maxSize); width = maxSize; }
          else { width = Math.round((width / height) * maxSize); height = maxSize; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Default data
export const DEFAULT_PROFILE = {
  artist_name: 'Radha Rani',
  tagline: 'Painter · Teacher · Creator',
  bio_1: 'I am a passionate Indian artist specializing in watercolor and acrylic paintings. My work draws inspiration from nature, emotions, and the vibrant colors of Indian culture.',
  bio_2: 'With over 10 years of experience, I conduct workshops for beginners and intermediate artists — both online and in-person — helping students discover their creative voice.',
  years_experience: '10',
  whatsapp: '919XXXXXXXXX',
  email: 'hello@radharani.com',
  instagram: '@radharaniart',
  location: 'Hyderabad, India',
  paintings_count: '200+',
  students_count: '1500+',
  workshops_count: '80+',
  photo: '',
};

export const DEFAULT_WORKSHOPS = [
  {
    id: 'w1',
    title: 'Beginner Watercolor Workshop',
    icon: '🎨',
    duration: '2 days',
    mode: 'Online & Offline',
    topics: ['Basic techniques & color theory', 'Understanding paper & brushes', 'Complete your first painting'],
    price: '₹2,500',
    perPerson: true,
    badge: 'Most Popular',
    badgeColor: '#c17f47',
    accent: 'linear-gradient(135deg, #f5c9a0, #e8956a)',
  },
  {
    id: 'w2',
    title: 'Intermediate Acrylic Masterclass',
    icon: '🖌️',
    duration: '3 days',
    mode: 'Offline only',
    topics: ['Texture & layering techniques', 'Composition & perspective', 'Portrait painting skills'],
    price: '₹4,500',
    perPerson: true,
    badge: 'Limited Seats',
    badgeColor: '#8b5e3c',
    accent: 'linear-gradient(135deg, #e8956a, #c17f47)',
  },
  {
    id: 'w3',
    title: 'Private 1:1 Coaching',
    icon: '✨',
    duration: 'Flexible sessions',
    mode: 'Online & Offline',
    topics: ['Personalized learning plan', 'Your choice of medium & style', 'Direct mentor feedback'],
    price: '₹1,500',
    perPerson: false,
    badge: 'Custom Plan',
    badgeColor: '#5a8a7a',
    accent: 'linear-gradient(135deg, #d4c4a8, #b8a880)',
  },
];
