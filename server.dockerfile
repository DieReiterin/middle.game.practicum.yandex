ARG NODE_VERSION=20
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster AS base

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server


FROM node:$NODE_VERSION-buster-slim AS production
WORKDIR /app

COPY packages/server/package.json /app/package.json
RUN yarn install --production=true

COPY --from=builder /app/packages/client/dist/ /app/client/dist
COPY --from=builder /app/packages/client/ssr-dist/ /app/client/ssr-dist

COPY --from=builder /app/packages/server/dist/ /app/
COPY --from=builder /app/packages/server/src/sequelize/ /app/src/sequelize
COPY --from=builder /app/packages/server/.sequelizerc /app/.sequelizerc

EXPOSE $SERVER_PORT

CMD [ "node", "/app/index.js" ]
