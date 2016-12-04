FROM markadams/chromium-xvfb

WORKDIR /opt/app

RUN apt-get update -q
RUN apt-get install -yqq curl git

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -yq nodejs

#Workaround for bug in latest NPM
RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs\.move/ ./lib/utils/rename.js

#Update npm
RUN npm install -g npm

# Install Prerequisites
RUN npm install --quiet -g angular-cli

COPY client/package.json /opt/app/package.json
RUN npm install
COPY client /opt/app/





