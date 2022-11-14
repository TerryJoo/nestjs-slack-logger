import { plainToInstance } from 'class-transformer';
import { IsUrl, validateSync } from 'class-validator';

export class SlackEnvironment {
  @IsUrl()
  slackUrl: string;

  static tryFromPlain(obj: object) {
    try {
      return SlackEnvironment.fromPlain(obj);
    } catch {
      return;
    }
  }

  static fromPlain(obj: object) {
    const result = plainToInstance(SlackEnvironment, obj);
    const errors = validateSync(result);

    if (errors.length) throw errors;

    return result;
  }

  static fromEnv() {
    return SlackEnvironment.fromPlain({ slackUrl: process.env.SLACK_URL });
  }

  static tryFromEnv() {
    return SlackEnvironment.tryFromPlain({ slackUrl: process.env.SLACK_URL });
  }
}
