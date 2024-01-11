FROM node:lts-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

FROM node:lts-alpine as next_builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL http://localhost:9003/api
ENV NEXT_INTERNAL_API_URL=http://redy-blog-api:9003/api
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:lts-alpine as next_runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3003
ENV NEXT_PUBLIC_API_URL http://localhost:9003/api
ENV NEXT_INTERNAL_API_URL=http://redy-blog-api:9003/api

COPY --from=next_builder /app/.next/standalone ./
COPY --from=next_builder /app/.next/static ./.next/static
COPY --from=next_builder /app/next.config.js ./
COPY --from=next_builder /app/package.json ./package.json


EXPOSE 3003
ENTRYPOINT [ "node", "server.js"]