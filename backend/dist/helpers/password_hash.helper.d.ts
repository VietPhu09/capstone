export declare const hashPassword: (password: string) => Promise<string>;
export declare const hashResetPassword: () => Promise<{
    paddedNumber: string;
    secret: string;
}>;
