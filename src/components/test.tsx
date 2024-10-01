import { useEffect, useState } from 'react';

export default function Test() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <div className="border-2 border-red-300 h-screen bg-primary">
      {loading ? 'Loading...' : 'Loaded!'}
    </div>
  );
}
