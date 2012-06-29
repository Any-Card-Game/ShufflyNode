Mongo
------------
  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
  wget http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
  sudo apt-get update
  sudo apt-get install mongodb-10gen
  mongo

Memcached
------------
  http://www.bookofzeus.com/articles/how-to-install-memcached-in-ubuntu/

Redis
------------

  # download and unpack the sources (see http://redis.io/download for the latest stable version)
  wget http://redis.googlecode.com/files/redis-2.4.5.tar.gz
  tar -zxvf redis-2.4.5.tar.gz
 
  # build
  cd redis-2.4.5/
  make
 
  # test
  # I needed to install tcl8.5 to run the tests: sudo apt-get install tcl8.5
  make test
 
  #install
  sudo make install
  cd utils
  sudo ./install_server.sh
 
  # run the redis cli (/usr/local/bin/redis-cli)
  redis-cli

NodeJS
------------

  sudo apt-get install python-software-properties
  sudo apt-add-repository ppa:chris-lea/node.js
  sudo apt-get update
  sudo apt-get install nodejs npm

