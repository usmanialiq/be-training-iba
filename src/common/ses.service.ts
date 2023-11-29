/* eslint-disable camelcase */
// https://docs.aws.amazon.com/ses/latest/dg/send-personalized-email-api.html
import { Injectable, Logger } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
  SendTemplatedEmailCommand,
  SendTemplatedEmailCommandInput,
  SendTemplatedEmailCommandOutput,
} from '@aws-sdk/client-ses';
import { Config } from '../config';

@Injectable()
export class SESService {
  private client = new SESClient({
    region: Config.aws.ses.region,
    credentials: {
      accessKeyId: Config.aws.ses.accessKey,
      secretAccessKey: Config.aws.ses.secretKey,
    },
  });
  private readonly logger = new Logger(SESService.name);

  async sendTemplateEmail(to: string, template: string, templateData: any) {
    try {
      const from: string = Config.mail.fromAddress;
      const receiverEmail =
        process.env.NODE_ENV === 'development' ? Config.mail.devEmail : to;

      const params: SendTemplatedEmailCommandInput = {
        Source: from,
        Destination: {
          ToAddresses: [receiverEmail],
        },
        Template: template,
        TemplateData: JSON.stringify(templateData),
      };

      const command: SendTemplatedEmailCommand = new SendTemplatedEmailCommand(
        params,
      );
      const response: SendTemplatedEmailCommandOutput = await this.client.send(
        command,
      );

      if (response.$metadata.httpStatusCode === 200) {
        this.logger.log('Email sent to', receiverEmail, 'template:', template);
        return 1;
      }
      return 0;
    } catch (error: any) {
      this.logger.error(to, 'Failed: Email dispatch to');
      throw new Error(error);
    }
  }

  async sendEmail(to: string[], subject: string, data: any) {
    try {
      const from: string = Config.mail.fromAddress;
      const receiverEmail =
        process.env.NODE_ENV === 'development' ? [Config.mail.devEmail] : to;
      const params: SendEmailCommandInput = {
        Source: from,
        Destination: {
          ToAddresses: receiverEmail,
        },
        Message: {
          Subject: {
            Data: subject,
          },
          Body: {
            Text: {
              Data: data,
            },
          },
        },
      };

      const command: SendEmailCommand = new SendEmailCommand(params);
      const response: SendEmailCommandOutput = await this.client.send(command);

      if (response.$metadata.httpStatusCode === 200) {
        this.logger.log('Email sent to', receiverEmail);
        return 1;
      }
      return 0;
    } catch (error: any) {
      this.logger.error(to, 'Failed: Email dispatch to');
      throw new Error(error);
    }
  }
}
