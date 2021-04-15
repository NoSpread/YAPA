FROM node:latest

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

RUN apt update
RUN apt upgrade -y

RUN curl "https://install.meteor.com/" | sh

WORKDIR /usr/src/yapa

COPY . .

RUN mkdir .meteor/local
RUN chmod -R 700 .meteor/local

RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]