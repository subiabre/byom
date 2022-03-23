FROM node:16-alpine

WORKDIR /root
COPY app/web/package.json app/web/package-lock.json ./
RUN npm i --no-optional

COPY app/web .

RUN npm run build

FROM node:16-slim

WORKDIR /root
COPY --from=0 /root .
COPY app/web .

EXPOSE 3000
CMD [ "node", "./build" ]
