FROM node

WORKDIR /typing_test_react

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
