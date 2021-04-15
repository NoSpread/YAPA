FROM node:latest

ENV ROOT_URL="http://localhost:3000"

RUN curl "https://install.meteor.com/" | sh

RUN useradd --create-home --shell /bin/bash yapa

USER yapa
WORKDIR /home/yapa

COPY . .

USER root 
RUN chown -R yapa:yapa /home/yapa
USER yapa

RUN npm install
RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]