FROM node:latest AS build

WORKDIR /app

RUN curl -fsSL https://bun.sh/install | bash

RUN ln -s $HOME/.bun/bin/bun /usr/local/bin/bun

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

CMD ["bun", "run", "start"]
