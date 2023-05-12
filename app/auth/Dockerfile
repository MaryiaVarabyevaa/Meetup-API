FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npx prisma generate --schema=./src/db/prisma.schema
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]