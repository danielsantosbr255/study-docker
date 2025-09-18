FROM node:22.16.0-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install

COPY . .

RUN pnpm build

# Prod
FROM node:22.16.0-alpine AS runner

WORKDIR /app

# Copia apenas o build e as dependências de produção
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml* ./

RUN corepack enable && pnpm install --prod --frozen-lockfile

EXPOSE 8000

CMD ["pnpm", "start"]
