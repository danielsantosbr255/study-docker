FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install

COPY . .
RUN pnpm build

# --------------------------------------------

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 8000
CMD ["node", "dist/main.js"]
