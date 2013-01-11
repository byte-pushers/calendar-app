#!/bin/bash

BASE_DIR=`dirname $0`
#prepare
command="testacular start $BASE_DIR/../resources/$*"
echo "PATH='$PATH'"
echo "BASE_DIR='$BASE_DIR'"
echo "Input Parameter 0='$0'"
echo "Input Parameter 1='$1'"
echo "Input Parameter *='$*'"
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "Executing Command = '$command'"
echo "-------------------------------------------------------------------"
#execute
$command
