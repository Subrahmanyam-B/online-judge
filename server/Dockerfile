FROM node:22-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN apk add --no-cache \
    g++ \
    openjdk17-jdk \
    python3 \
    py3-pip


RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]


