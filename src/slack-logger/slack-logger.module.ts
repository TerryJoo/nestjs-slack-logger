import { InjectionToken, ValueProvider } from '@nestjs/common';
import { LOGGER_CONTEXT_TOKEN, SLACK_IMOJI_TOKEN } from './constants';
import { SlackLogger } from './slack-logger.service';

export class SlackLoggerModule {
  /**
   * @param context ex) YourService.name
   * @param slackImoji ex) ":technologist:"
   * @returns
   */
  public static register({
    context = 'DEFAULT',
    slackImoji,
  }: SLoggerRegisterOptions = {}) {
    const providers = [
      SlackLogger,
      generateValueProvider(LOGGER_CONTEXT_TOKEN, context),
    ];

    if (slackImoji)
      providers.push(generateValueProvider(SLACK_IMOJI_TOKEN, slackImoji));

    return {
      module: SlackLoggerModule,
      providers,
      exports: [SlackLogger],
    };
  }
}

export type SLoggerRegisterOptions = {
  context?: string;
  slackImoji?: string;
};

function generateValueProvider(
  provide: InjectionToken,
  useValue: any,
): ValueProvider {
  return { provide, useValue };
}
