import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import HeroImageManager from './sections/HeroImageManager';
import GalleryManager from './sections/GalleryManager';
import ShopManager from './sections/ShopManager';
import EventsManager from './sections/EventsManager';
import WorkshopsManager from './sections/WorkshopsManager';
import ProfileManager from './sections/ProfileManager';
import StatsOverview from './sections/StatsOverview';
import EnquiriesManager from './sections/EnquiriesManager';

export default function AdminDashboard() {
  const [active, setActive] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const renderSection = () => {
    switch (active) {
      case 'hero':      return <HeroImageManager />;
      case 'gallery':   return <GalleryManager />;
      case 'shop':      return <ShopManager />;
      case 'events':    return <EventsManager />;
      case 'workshops': return <WorkshopsManager />;
      case 'enquiries': return <EnquiriesManager />;
      case 'profile':   return <ProfileManager />;
      case 'stats':     return <StatsOverview />;
      default:          return <HeroImageManager />;
    }
  };

  return (
    <AdminLayout active={active} onSelect={setActive}>
      {renderSection()}
    </AdminLayout>
  );
}
