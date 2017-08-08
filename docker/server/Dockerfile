FROM node:latest

# Install Utilities
RUN apt-get update -q
RUN apt-get install -yqq python-dev python-pip

#upgrade pip
RUN pip install --upgrade pip

# Install Elastalert
RUN mkdir /opt/elastalert
WORKDIR /opt/elastalert
COPY ./elastalert /opt/elastalert
RUN pip install -r requirements.txt
RUN python setup.py install

# Install Prerequisites
RUN npm install --quiet -g node-gyp gulp-cli

RUN mkdir /opt/app && mkdir /opt/app/server
WORKDIR /opt/app/server

# Share local directory on the docker container
COPY ./server /opt/app/server

RUN npm install

# Machine cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
