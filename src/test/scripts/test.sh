#!/bin/bash

BASE_DIR=`dirname $0`
export PATH=$PATH:$1

echo ""
echo "Base Dir: " $BASE_DIR
echo "Param 0: " $0
echo "Param 1: " $1
echo "Param 2: " $2
echo "Path: " $PATH
echo "Starting karma Server (http://vojtajina.github.com/karma)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/../resources/$2
