FROM node:22.14.0-alpine AS builder
WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install

COPY . .