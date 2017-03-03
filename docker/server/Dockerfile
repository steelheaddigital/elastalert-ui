FROM ubuntu:latest

# Install Utilities
RUN apt-get update -q
RUN apt-get install -yqq wget aptitude git traceroute dnsutils curl ssh sudo tree tcpdump psmisc gcc make build-essential libfreetype6 libfontconfig libkrb5-dev python-dev python-pip

#upgrade pip
RUN pip install --upgrade pip

# Install Elastalert
COPY ./elastalert /opt/elastalert
RUN cd /opt/elastalert && pip install -r requirements.txt
RUN cd /opt/elastalert && python setup.py install

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -yq nodejs

#Workaround for bug in latest NPM
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs\.move/ ./lib/utils/rename.js

#Update npm
RUN npm install -g npm

# Install Prerequisites
RUN npm install --quiet -g node-gyp gulp-cli

RUN mkdir /opt/app && mkdir /opt/app/server
WORKDIR /opt/app/server

# Share local directory on the docker container
COPY ./server /opt/app/server

RUN npm install

# Machine cleanup
RUN npm cache clean && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
