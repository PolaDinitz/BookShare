FROM node:14-alpine
RUN mkdir -p /svr/app
WORKDIR /svr/app
RUN npm i -g @nestjs/cli --silent
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
COPY . .
# Value set in .env file.
EXPOSE $BACKEND_PORT
CMD ["npm", "run", "start:debug"]