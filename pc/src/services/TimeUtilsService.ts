// Time Utils Service

export class TimeUtilsService {
  /**
   * Get current time in specific timezone
   */
  static getTimeInTimezone(timezone: string, format: '12h' | '24h' = '24h'): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour12: format === '12h',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  /**
   * Get time components
   */
  static getTimeComponents(timezone: string, format: '12h' | '24h' = '24h') {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour12: format === '12h',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    
    const result: any = {};
    parts.forEach(part => {
      result[part.type] = part.value;
    });

    return result;
  }

  /**
   * Get all available timezones
   */
  static getAvailableTimezones() {
    return [
      'UTC',
      'Asia/Ho_Chi_Minh',
      'Asia/Bangkok',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Asia/Hong_Kong',
      'Asia/Singapore',
      'Asia/Kolkata',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Moscow',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'America/Toronto',
      'America/Sao_Paulo',
      'Australia/Sydney',
      'Pacific/Auckland'
    ];
  }

  /**
   * Get timezone offset
   */
  static getTimezoneOffset(timezone: string): number {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
  }
}
