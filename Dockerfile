FROM node:6-onbuild

RUN apt-get update && apt-get install -y wget && wget https://get.docker.com/ | sh -
