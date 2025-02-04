import { Provider } from '@angular/core';
import { LoggerService } from './logger.service';
import { LOGGER_CONFIG, LoggerConfig, LogLevel } from './logger.config';

export function provideLogger(
  config: LoggerConfig = { level: LogLevel.Info }
): Provider[] {
  return [
    LoggerService,
    {
      provide: LOGGER_CONFIG,
      useValue: config,
    },
  ];
}
