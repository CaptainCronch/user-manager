 # syntax=docker/dockerfile:1

FROM node:18-alpine
LABEL maintainer="Pedro Proenca <crisdelpedro@gmail.com>"
LABEL description="Simple web app that creates and manages a list of users."
LABEL cohort="16"
COPY users.json .
COPY package.json .
COPY app.js .
COPY /static/ /static/
RUN npm install
CMD ["node", "app.js"]
EXPOSE 5050
