#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting karma Server (http://vojtajina.github.com/karma)"
echo "-------------------------------------------------------------------"

export DISPLAY=:1
Xvfb :1 &

#
# Fetch node and karma if we don't have it already
#


node_version=v0.8.14
install_name=node-$node_version-linux-x64
node_home=$PWD/$install_name


#if [ ! -e $install_name.tar.gz ]
#then
    wget http://nodejs.org/dist/$node_version/$install_name.tar.gz
    tar xf $install_name.tar.gz
    $node_home/bin/npm install -g karma
#fi

export PATH=$PATH:$node_home/bin
karma start $BASE_DIR/../resources/karma.conf.js $*
