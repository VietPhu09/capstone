export declare class EmailService {
    private readonly transporter;
    constructor();
    sendEmail(to: string, subject: string, text: string, qr: string): Promise<void>;
    sendEmailToResetPassword(to: string, subject: string, text: string): Promise<void>;
}
