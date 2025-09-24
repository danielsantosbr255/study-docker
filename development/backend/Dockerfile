# ---------------- Base ----------------

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./

# ------------- dev -------------

FROM base AS dev
RUN pnpm install
COPY . .

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE ${PORT}
CMD ["pnpm", "dev"]

# ------------- build ----------------

FROM base AS build

RUN pnpm install --prod
COPY . .

# ------------- Production -------------

FROM gcr.io/distroless/nodejs22-debian12 AS production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}
CMD ["./src/main.js"]
