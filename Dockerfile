# pull official base image
FROM node:12.16.3

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
RUN yarn install
COPY . /app
EXPOSE 3000
# start app
CMD ["yarn", "start"]  
