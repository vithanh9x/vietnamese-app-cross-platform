// Local Storage Service for Clock Settings

export class ClockStorageService {
  private static readonly STORAGE_KEY = 'clock_settings';
  private static readonly TIMEZONES_KEY = 'selected_timezones';
  private static readonly FORMAT_KEY = 'time_format';
  private static readonly LANGUAGE_KEY = 'language';

  /**
   * Save selected timezones
   */
  static saveTimezones(timezones: string[]): void {
    try {
      localStorage.setItem(this.TIMEZONES_KEY, JSON.stringify(timezones));
    } catch (error) {
      console.error('Error saving timezones:', error);
    }
  }

  /**
   * Get saved timezones
   */
  static getTimezones(): string[] {
    try {
      const data = localStorage.getItem(this.TIMEZONES_KEY);
      return data ? JSON.parse(data) : ['Asia/Ho_Chi_Minh', 'Asia/Tokyo', 'America/New_York'];
    } catch (error) {
      console.error('Error retrieving timezones:', error);
      return ['Asia/Ho_Chi_Minh', 'Asia/Tokyo', 'America/New_York'];
    }
  }

  /**
   * Save time format preference
   */
  static saveTimeFormat(format: '12h' | '24h'): void {
    try {
      localStorage.setItem(this.FORMAT_KEY, format);
    } catch (error) {
      console.error('Error saving time format:', error);
    }
  }

  /**
   * Get time format preference
   */
  static getTimeFormat(): '12h' | '24h' {
    try {
      const format = localStorage.getItem(this.FORMAT_KEY) as '12h' | '24h';
      return format || '24h';
    } catch (error) {
      console.error('Error retrieving time format:', error);
      return '24h';
    }
  }

  /**
   * Save language preference
   */
  static saveLanguage(language: 'vi' | 'en'): void {
    try {
      localStorage.setItem(this.LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  /**
   * Get language preference
   */
  static getLanguage(): 'vi' | 'en' {
    try {
      const language = localStorage.getItem(this.LANGUAGE_KEY) as 'vi' | 'en';
      return language || 'en';
    } catch (error) {
      console.error('Error retrieving language:', error);
      return 'en';
    }
  }

  /**
   * Save complete clock settings
   */
  static saveSettings(settings: any): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  /**
   * Get complete clock settings
   */
  static getSettings(): any {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving settings:', error);
      return null;
    }
  }

  /**
   * Clear all settings
   */
  static clearAll(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.TIMEZONES_KEY);
      localStorage.removeItem(this.FORMAT_KEY);
      localStorage.removeItem(this.LANGUAGE_KEY);
    } catch (error) {
      console.error('Error clearing settings:', error);
    }
  }
}
