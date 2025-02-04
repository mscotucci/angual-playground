import { InjectionToken } from '@angular/core';

export enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

export interface LoggerConfig {
  level: LogLevel;
}

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('LOGGER_CONFIG');
