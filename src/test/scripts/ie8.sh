#!/bin/bash
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

VMNAME="Win7_IE8"
VMPATH="/Users/pouncilt/documents/Virtual Machines.localized/Win7_IE8.vmwarevm/Win7_IE8.vmx"
LOG_FILE="/Users/pouncilt/Development/software/virtual-machine/ie8.log"
#IE_BIN="C:\Program Files\Internet Explorer\iexplore.exe"

. $DIR/ie.sh