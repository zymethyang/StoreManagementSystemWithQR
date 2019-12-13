FROM node:12-alpine

#Create working dir
RUN mkdir /app
WORKDIR /app

#Copy package.json file to install dependency
COPY package.json package-lock.json /app/

#Install dependency
RUN npm install

#Copy source code
COPY . /app/

EXPOSE 80

#Start render server
CMD [ "npm","start" ]