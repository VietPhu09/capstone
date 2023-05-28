import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private accountService;
    private jwtService;
    constructor(reflector: Reflector, accountService: AccountsService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
