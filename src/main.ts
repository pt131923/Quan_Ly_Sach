import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer: any;

async function bootstrapServerless() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Swagger (disable in production)
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Quản Lý Sách')
        .setDescription('Tài liệu API cho ứng dụng Quản Lý Sách')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
    }

    await app.init();
    cachedServer = expressApp;
  }

  return cachedServer;
}


// ✅ Khi chạy local, sẽ listen port
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Quản Lý Sách')
        .setDescription('Tài liệu API cho ứng dụng Quản Lý Sách')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
    }

    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`🚀 Server listening on http://localhost:${port}`);
  }

  bootstrapLocal();
}
