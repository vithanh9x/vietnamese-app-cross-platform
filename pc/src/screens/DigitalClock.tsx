# PC Digital Clock - React Component

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/DigitalClock.css';

interface ClockItem {
  id: string;
  timezone: string;
  label: string;
}

const DigitalClock: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [clocks, setClocks] = useState<ClockItem[]>([
    { id: '1', timezone: 'Asia/Ho_Chi_Minh', label: 'Vietnam' },
    { id: '2', timezone: 'Asia/Tokyo', label: 'Japan' },
    { id: '3', timezone: 'America/New_York', label: 'New York' }
  ]);
  const [format, setFormat] = useState<'12h' | '24h'>('24h');
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      
      clocks.forEach(clock => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: clock.timezone,
          hour12: format === '12h',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        newTimes[clock.id] = new Intl.DateTimeFormat('en-US', options).format(now);
      });
      
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [clocks, format]);

  const handleAddClock = () => {
    const newId = Date.now().toString();
    setClocks([...clocks, { id: newId, timezone: 'UTC', label: 'New Clock' }]);
  };

  const handleRemoveClock = (id: string) => {
    setClocks(clocks.filter(c => c.id !== id));
  };

  return (
    <div className="digital-clock-container">
      <header className="clock-header">
        <h1>{t('clock.title')}</h1>
        <div className="header-controls">
          <button onClick={() => setFormat(format === '12h' ? '24h' : '12h')}>
            {format === '12h' ? t('clock.format_24h') : t('clock.format_12h')}
          </button>
          <button onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}>
            {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
          </button>
        </div>
      </header>

      <main className="clocks-grid">
        {clocks.map(clock => (
          <div key={clock.id} className="clock-card">
            <div className="clock-label">{clock.label}</div>
            <div className="clock-timezone">{clock.timezone}</div>
            <div className="clock-time digital-display">
              {times[clock.id] || '--:--:--'}
            </div>
            <button 
              className="btn-remove"
              onClick={() => handleRemoveClock(clock.id)}
            >
              {t('buttons.remove')}
            </button>
          </div>
        ))}
      </main>

      <footer className="clock-footer">
        <button className="btn-add" onClick={handleAddClock}>
          {t('clock.add_timezone')}
        </button>
      </footer>
    </div>
  );
};

export default DigitalClock;
