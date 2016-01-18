FROM nodesource/jessie:5.3.0
MAINTAINER Lachlan Kermode

## create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install packages
COPY package.json /usr/src/app/
RUN npm install

# bundle source code
COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "dev"]