FROM node:16

RUN apt update && apt install -y \
    bash curl

WORKDIR /app

COPY app/web/svelte.config.js app/web/package*.json /app/
COPY app/web/src /app/src/
COPY app/web/static /app/static/

RUN npm install

RUN npm run build

EXPOSE 3000
ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev", "--", "--host" ]