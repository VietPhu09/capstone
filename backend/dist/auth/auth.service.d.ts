import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateAccount(email: string, pass: string): Promise<any>;
    login({ email }: {
        email: any;
    }): Promise<{
        access_token: string;
        id: any;
    }>;
}
