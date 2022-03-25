FROM node:16-alpine

WORKDIR /root

COPY web .

RUN npm ci
RUN npm audit fix
RUN npm run build

EXPOSE 3000
CMD ["node", "./build"]
