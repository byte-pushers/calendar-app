#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "BASE_DIR='$BASE_DIR'"
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

testacular start $BASE_DIR/../config/testacular.conf.js $*
