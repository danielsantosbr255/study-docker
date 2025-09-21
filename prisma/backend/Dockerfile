FROM node:22.16.0-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY prisma ./prisma
RUN npx prisma generate
COPY . .

# ---------------- Cleanup ----------------

FROM node:22.16.0-alpine AS cleanup
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN corepack enable && pnpm install && pnpm prune --prod

COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

# ---------------- Production ----------------

FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app

COPY --from=cleanup /app/node_modules ./node_modules
COPY --from=cleanup /app/package.json ./
COPY --from=cleanup /app/generated ./generated
COPY --from=cleanup /app/prisma ./prisma
COPY --from=cleanup /app/src ./src

EXPOSE 5000

CMD ["src/index.js"]
