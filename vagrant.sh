#!/bin/bash
sudo apt-get update
apt-get install -y  mc htop nmap git-core curl python3-pip

which docker

if ! which docker > /dev/null; then
  echo -e "docker is not found! Installing\c"
  wget -O docker.sh https://get.docker.com
  bash docker.sh
fi

usermod -aG docker vagrant

pip3 install docker-compose

cd /vagrant/app
mkdir finance
docker run -v $(pwd):/app  symfony new finance 3.4
docker run -v $(pwd)/finance:/app composer install
docker-compose up -d
docker ps
docker exec php.app chmod 777 -R /data/var
