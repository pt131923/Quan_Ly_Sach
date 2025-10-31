import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer: any;

async function bootstrapServerless() {
  // ... (Giữ nguyên hàm này cho môi trường Serverless)
}

// ✅ Hàm chạy local hoặc Render
async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    // 1. Cấu hình Document và Tags
    const config = new DocumentBuilder()
      .setTitle('Hệ thống Quản Lý Sách (QL_SACH)') // Tiêu đề mới
      .setDescription('Tài liệu API cho ứng dụng Quản Lý Sách. Các nhóm được phân cấp và sắp xếp bằng Tags.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    
    // 2. Tùy chỉnh Giao diện Swagger UI
    const swaggerCustomOptions = {
      customSiteTitle: 'QL_SACH API Docs',
      swaggerOptions: {
        // Đặt 'none' để các nhóm (Tags) mặc định đóng lại, giống giao diện bạn muốn
        docExpansion: 'none', 
        // Cho phép lọc/tìm kiếm các Tags
        filter: true,
        // Sắp xếp các Tags theo thứ tự bảng chữ cái/số
        tagsSorter: 'alpha', 
      },
    };

    SwaggerModule.setup('api/docs', app, document, swaggerCustomOptions);
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = Number(process.env.PORT) || 8080; // Đổi lại port 8888 nếu bạn thích
  await app.listen(port);
  console.log(`✅ App is listening on port: ${port}`);
}

bootstrapLocal();