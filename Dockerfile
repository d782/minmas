FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm i

RUN npm install -g @angular/cli

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build app/dist/minmas/browser /usr/share/nginx/html

EXPOSE 80



