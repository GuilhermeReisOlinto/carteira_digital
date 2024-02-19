export interface INotifications {
    sendSms(payload: any): Promise<boolean>
}