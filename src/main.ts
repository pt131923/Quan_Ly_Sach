import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler;

async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  
  const app = await NestFactory.create(AppModule, adapter);
  
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

  await app.init();
  
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    async function startLocal() {
        const expressApp = express();
        const adapter = new ExpressAdapter(expressApp);
        const app = await NestFactory.create(AppModule, adapter);
        
        if (process.env.NODE_ENV !== 'production') {
            const config = new DocumentBuilder()
                .setTitle('Quản Lý Sách API')
                .build();
            const document = SwaggerModule.createDocument(app, config);
            SwaggerModule.setup('api/docs', app, document); 
        }

        const port = process.env.PORT || 8080;
        await app.listen(port); 
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
    startLocal();
}