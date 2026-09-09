import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private resend;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string, attachments?: any[]): Promise<import("resend").CreateEmailResponse>;
}
