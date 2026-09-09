import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private configService;
    private secretKey;
    private baseUrl;
    constructor(configService: ConfigService);
    private fetchPaystack;
    initializeTransaction(email: string, amount: number, reference: string): Promise<any>;
    verifyTransaction(reference: string): Promise<any>;
    chargeAuthorization(authCode: string, email: string, amount: number): Promise<any>;
}
