# Set up Prisma ORM

1. install the Prisma CLI as a development dependency in the project
   `pnpm install prisma -D`

2. set up Prisma ORM with the init command of the Prisma CLI (SQLite)
   `npx prisma init --datasource-provider sqlite --output ../generated/prisma`

3. Run a migration to create your database tables with Prisma Migrate
   `npx prisma migrate dev --name init`

# Install and generate Prisma Client

1. To get started with Prisma Client, you need to install the @prisma/client package:
   `pnpm add @prisma/client`

2. Then, run prisma generate which reads your Prisma schema and generates the Prisma Client:
   `npx prisma generate`

# Running Container

`docker run -d --name prisma-node -p 3000:3000 -e DATABASE_URL="file:./dev.db" prisma-node:1.0`

# Building Terminal Dockerfile

1. builda imagens
   `docker build --target builder -t myapp:builder ./api`
   `docker build --target runner -t myapp:runner ./api`

2. sobe banco
   `docker run -d --name mydb -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 postgres:16-alpine`

3. roda migrations (container sobe e morre)
   `docker run --rm --name prisma-migrate --env-file ./.env --network host myapp:builder npx prisma migrate deploy`

4. sobe API
   `docker run -d --name myapi --env-file ./.env -p 3000:3000 myapp:runner`

# Building With Docker Compose

`docker compose run --rm migrate`

`docker run -d -p 3000:3000 -v ./data:/app/prisma --name myapi myapp:runner`
