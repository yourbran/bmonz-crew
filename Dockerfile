# ───────────────────────────────────────────
# 1) 의존성 설치 전용 스테이지
# ───────────────────────────────────────────
#FROM node:18-alpine AS deps
FROM node:22.14.0-alpine AS deps
WORKDIR /app

# package.json, package-lock.json만 복사해서 의존성 설치 캐싱
COPY package.json package-lock.json ./
RUN npm ci

# ───────────────────────────────────────────
# 2) 빌드 전용 스테이지
# ───────────────────────────────────────────
FROM node:22.14.0-alpine AS builder
WORKDIR /app

# deps 스테이지에서 설치된 node_modules를 복사
COPY --from=deps /app/node_modules ./node_modules

# 나머지 소스 복사
COPY . .

# Next.js 빌드
RUN npm run build


# ───────────────────────────────────────────
# 3) 프로덕션 실행 전용 스테이지
# ───────────────────────────────────────────
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 빌드된 결과물과 최소 의존성만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# 컨테이너 외부에 노출할 포트 (Next.js 기본: 3000)
EXPOSE 3000

# 컨테이너 기동 시 앱 시작
CMD ["npm", "start"]