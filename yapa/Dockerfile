FROM node:latest

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost"
ENV PORT=3000

RUN apt update
RUN apt upgrade -y

RUN curl "https://install.meteor.com/" | sh

WORKDIR /usr/src/yapa

COPY . .

RUN mkdir ../build
RUN mkdir .meteor/local
RUN chmod -R 700 .meteor/local

RUN meteor npm install

RUN meteor build --directory ../build --server-only

WORKDIR /usr/src/build/bundle

RUN cd programs/server && npm install

EXPOSE 3000
CMD ["node", "main"]