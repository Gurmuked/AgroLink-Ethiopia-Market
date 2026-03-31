import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Watches route changes and clears auth when leaving dashboard routes.
export default function DashboardWatcher() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPath.current;
    const next = location.pathname;

    const wasOnBuyer = prev.startsWith('/buyer-dashboard');
    const wasOnSeller = prev.startsWith('/seller-dashboard');
    const nowOnBuyer = next.startsWith('/buyer-dashboard');
    const nowOnSeller = next.startsWith('/seller-dashboard');

    // If we moved from any dashboard to a non-dashboard route, clear auth so back requires login
    if ((wasOnBuyer || wasOnSeller) && !(nowOnBuyer || nowOnSeller)) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (err) {
        // ignore
      }
    }

    prevPath.current = next;
  }, [location.pathname]);

  return null;
}
