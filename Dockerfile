FROM    centos:centos6
MAINTAINER Lachlan Kermode

RUN     yum install -y epel-release
RUN     yum install -y nodejs npm

## create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install packages
 COPY package.json /usr/src/app/

RUN npm install

# bundle source code
COPY public /usr/src/app
COPY server.js /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]