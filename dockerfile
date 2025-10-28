# ========== STAGE 1: BUILD ==========
FROM node:18-alpine AS builder

# Thư mục làm việc
WORKDIR /app

# Copy file cần thiết trước để cache
COPY package*.json ./

# Cài dependency
RUN npm install

# Copy toàn bộ source
COPY . .

# Build TypeScript ra thư mục dist
RUN npm run build


# ========== STAGE 2: RUN ==========
FROM node:18-alpine

WORKDIR /app

# Copy file package trước để install prod-deps
COPY package*.json ./

# Chỉ cài dependencies cần để run production
RUN npm install --only=production

# Copy folder build từ stage 1
COPY --from=builder /app/dist ./dist

# Mở port NestJS
EXPOSE 8080

# Lệnh chạy app
CMD ["node", "dist/main.js"]

ENV PORT=8080

