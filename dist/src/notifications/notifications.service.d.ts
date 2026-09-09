export declare class NotificationsService {
    sendPushNotification(token: string, title: string, body: string): Promise<{
        success: boolean;
    }>;
}
