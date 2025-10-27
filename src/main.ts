// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
// import các thư viện Serverless (serverless-express, aws-lambda) KHÔNG CẦN THIẾT

// Sử dụng Express cho NestJS
const expressApp = express(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  // Cấu hình các thiết lập (Swagger, GlobalPrefix...)
  if (process.env.NODE_ENV !== 'production') {
      // Logic khởi tạo Swagger
      // ...
  }
  
  // Áp dụng các Global Filters/Pipes/Interceptors
  // app.setGlobalPrefix('api'); // Ví dụ

  await app.init();
}

// Gọi bootstrap để khởi tạo server.
// Sau đó, sử dụng handler của Vercel (nếu có) hoặc handler Express (cho local)
// VERCEL TỰ ĐỘNG BIÊN DỊCH VÀ TẠO RA EXPORT HANDLER CHO BẠN TỪ ĐÂY.
bootstrap(); 

// Dùng cho chạy local:
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    async function startLocal() {
        const app = await NestFactory.create(AppModule);
        const port = process.env.PORT || 8080;
        await app.listen(port); 
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
    // Chạy logic local riêng
    // startLocal(); 
}

// QUAN TRỌNG: Bạn cần export app hoặc server đã init ra ngoài, 
// hoặc dùng cách đơn giản nhất là chỉ gọi `bootstrap()` và cấu hình `vercel.json`.
// Hầu hết các hướng dẫn NestJS + Vercel đơn giản không yêu cầu export.
// Nếu lỗi vẫn xảy ra, hãy thử cách dùng `module.exports` như đã đề xuất trước:

module.exports = async (req, res) => {
    await bootstrap();
    expressApp(req, res);
};