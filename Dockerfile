#FROM node:14
#WORKDIR .
#COPY package*.json ./
#RUN npm install
#COPY . .
#ENV PORT=8080
#ENV DB_HOST=localhost
#ENV DB_PORT=5432
#ENV DB_USER=postgres
#ENV DB_PASSWORD=password
#ENV DB_NAME=mydatabase
#ENV JWT_ACCCESS_SECRET=jwt-secret-key
#ENV JWT_REFRESH_SECRET=jwt-refresh-secret-key
#
##CMD service postgresql start
#CMD ["npm", "start"]

FROM node:14
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "start"]
