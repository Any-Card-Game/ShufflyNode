

Setup
------------
		apt-get update
		apt-get install make
		cd ../usr/local/src

Mongo
------------
		sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
		wget http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
		sudo apt-get update
		sudo apt-get install mongodb-10gen
		mongo



		sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
		Create a the /etc/apt/sources.list.d/10gen.list file and include the following line for the 10gen repository.

		If you use an Ubuntu version with “Upstart” (i.e. any since version 9.10 “Karmic,”) or are running with Upstart on Debian, use the following line:

		deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
		If you are using Debian or Ubuntu that uses SysV style init process, use the following line:

		deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen
		Now issue the following command to reload your repository:

		sudo apt-get update
		Install Packages
		Issue the following command to install the latest stable version of MongoDB:

		sudo apt-get install mongodb-10gen






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

