# FROM node:alpine
# WORKDIR '/app'
# COPY ./package.json ./
# RUN npm install
# COPY . .
# ENV PORT=3001
# # RUN npm run build
# EXPOSE ${PORT}
# CMD [ "npm", "run", "start" ]

FROM node:14
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install
ENV MONGO_URI='mongodb://mongo:27017/appnamehere'
ENV APP_NAME='appnamehere'
ENV PORT=3001
COPY . .
EXPOSE ${PORT}
CMD ["node", "server.js"]