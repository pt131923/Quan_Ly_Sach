import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '✅ Server running at: http://localhost:8080';
  }
}
