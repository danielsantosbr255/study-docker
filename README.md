# 🐳 study-docker

- create a new container on terminal
  docker run -d -p 5432:5432 --name bookstore-postgres --network bookstore -v bookstore-db:/var/lib/postgresql/data
  -e POSTGRES_PASSWORD=postgres
  -e POSTGRES_USER=postgres
  -e POSTGRES_DB=bookstore postgres

- create build
  docker build -t api-node:1.0 .

- create container
  docker run -d --name api-node -p 8000:8000 api-node:1.0
