import { Injectable, inject } from '@angular/core';
import { LOGGER_CONFIG, LogLevel } from './logger.config';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private config = inject(LOGGER_CONFIG);

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private logWithLevel(level: LogLevel, message: string, ...args: any[]): void {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const caller = (new Error().stack?.split('\n')[3] || '').trim();
      const prefix = `[${LogLevel[level]}] ${timestamp} ${caller}:`;
      console.log(prefix, message, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    this.logWithLevel(LogLevel.Debug, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.logWithLevel(LogLevel.Info, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.logWithLevel(LogLevel.Warn, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.logWithLevel(LogLevel.Error, message, ...args);
  }
}
