// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

// HÀM KHỞI TẠO VÀ TRẢ VỀ EXPRESS APP
async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    
    // Cấu hình Swagger
    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('Quản Lý Sách API')
            .setDescription('Tài liệu API cho ứng dụng Quản Lý Sách')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document); 
    }

    // Quan trọng: Phải gọi app.init() để module được load
    await app.init();
    cachedServer = expressApp; 
  }
  return cachedServer;
}

// XUẤT MODULE DƯỚI DẠNG HÀM HANDLER CHÍNH
module.exports = async (req, res) => {
  const server = await bootstrap();
  server(req, res);
};

// **********************************************
// * Bỏ tất cả logic if (!process.env.AWS_LAMBDA_FUNCTION_NAME) ở dưới *
// * để tránh xung đột với module.exports bên trên. *
// **********************************************