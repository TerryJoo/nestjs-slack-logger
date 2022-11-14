import { Injectable, ConsoleLogger, Inject, LogLevel } from '@nestjs/common';
import { Optional } from '@nestjs/common/decorators/core/optional.decorator';
import { SlackService } from 'nestjs-slack';
import { LOGGER_CONTEXT_TOKEN, SLACK_IMOJI_TOKEN } from './constants';

@Injectable()
export class SlackLogger extends ConsoleLogger {
  constructor(
    @Optional() @Inject(LOGGER_CONTEXT_TOKEN) context?: string,
    @Optional() @Inject(SLACK_IMOJI_TOKEN) private readonly iconEmoji?: string,
    @Optional() private slack?: SlackService,
  ) {
    const logLevels: LogLevel[] = ['error', 'warn'];
    super(context);

    if (process.env.NODE_ENV !== 'production') {
      logLevels.push('debug', 'log');
      this.log = (message: any, ...optionalParams: any[]): void => {
        this.slack?.postMessage({ text: message, icon_emoji: this.iconEmoji });
        super.log(message, ...optionalParams);
      };

      this.debug = (message: any, ...optionalParams: any[]) => {
        this.slack?.postMessage({ text: message, icon_emoji: this.iconEmoji });
        super.debug(message, ...optionalParams);
      };

      this.verbose = (message: any, ...optionalParams: any[]) => {
        this.slack?.postMessage({ text: message, icon_emoji: this.iconEmoji });
        super.verbose(message, ...optionalParams);
      };
    }

    super.setLogLevels(logLevels);
  }

  error(message: any, ...optionalParams: any[]) {
    this.slack?.postMessage({ text: message, icon_emoji: this.iconEmoji });
    super.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.slack?.postMessage({ text: message, icon_emoji: this.iconEmoji });
    super.warn(message, ...optionalParams);
  }
}
