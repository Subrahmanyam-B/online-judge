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

# Set the default Java version to 17
RUN ln -s /usr/lib/jvm/java-17-openjdk/bin/java /usr/bin/java

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
