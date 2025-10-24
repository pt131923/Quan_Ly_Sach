import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from 'express';
import serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors(); // nếu cần
    await app.init();
  }
  bootstrap().catch(err => {
    console.error('Failed to bootstrap Nest app', err);
  });
  
  export const handler = serverless(expressApp);