#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting karma Server (http://vojtajina.github.com/karma)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/../resources/karma.conf.js $*
