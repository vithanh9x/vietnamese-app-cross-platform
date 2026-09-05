// Shared Clock Types and Constants

export interface Clock {
  id: string;
  timezone: string;
  label: string;
  offset: number;
}

export interface TimeDisplay {
  hours: string;
  minutes: string;
  seconds: string;
  period?: 'AM' | 'PM';
  timezone: string;
  label: string;
}

export const COMMON_TIMEZONES: Clock[] = [
  { id: 'utc', timezone: 'UTC', label: 'UTC', offset: 0 },
  { id: 'asia_ho_chi_minh', timezone: 'Asia/Ho_Chi_Minh', label: 'Vietnam', offset: 420 },
  { id: 'asia_bangkok', timezone: 'Asia/Bangkok', label: 'Thailand', offset: 420 },
  { id: 'asia_tokyo', timezone: 'Asia/Tokyo', label: 'Japan', offset: 540 },
  { id: 'asia_shanghai', timezone: 'Asia/Shanghai', label: 'China', offset: 480 },
  { id: 'europe_london', timezone: 'Europe/London', label: 'UK', offset: 0 },
  { id: 'america_new_york', timezone: 'America/New_York', label: 'New York', offset: -300 },
  { id: 'america_los_angeles', timezone: 'America/Los_Angeles', label: 'Los Angeles', offset: -480 },
  { id: 'australia_sydney', timezone: 'Australia/Sydney', label: 'Australia', offset: 600 }
];
