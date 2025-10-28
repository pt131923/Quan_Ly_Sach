// src/common/guards/role-guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Định nghĩa kiểu Vai trò (có thể đặt trong file riêng, nhưng để đơn giản ta dùng string)
type Role = 'admin' | 'user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ROLES_KEY = 'roles'; 
    
    // 1. Lấy ra các vai trò được yêu cầu từ Decorator (@Roles)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
        return false; 
    }

    return requiredRoles.includes(user.role as Role);
  }
}