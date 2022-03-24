FROM node:16-alpine

WORKDIR /app

COPY web .

RUN npm ci
RUN npm audit fix
RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=0 /app/package*.json ./

RUN npm ci --production --ignore-scripts
RUN npm audit fix

EXPOSE 3000
CMD ["node", "./build"]
