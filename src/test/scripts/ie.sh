#!/bin/bash

export PATH="/Applications/VMware Fusion.app/Contents/Library/":$PATH

winExec() {
  if [[ "$VMPATH" == *XP* ]]; then
    vmrun -T fusion -gu IEUser -gp Password1 runScriptInGuest "$VMPATH" "" "cmd.exe /c \"$1\" $2 $3 $4" >> $LOG_FILE 2>&1
  else
    vmrun -T fusion -gu IEUser -gp Password1 runScriptInGuest "$VMPATH" -activeWindow -interactive "" "cscript.exe \"$1\" $2" >> $LOG_FILE 2>&1
  fi
  sleep 3
}

winExecute() {
  if [[ "$VMPATH" == *XP* ]]; then
    vmrun -T fusion -gu IEUser -gp Password1 runScriptInGuest "$VMPATH" "" "cmd.exe /c \"$1\" $2 $3 $4" >> $LOG_FILE 2>&1
  else
    vmrun -T fusion -gu IEUser -gp Password1 runProgramInGuest "$VMPATH" -activeWindow -interactive "$1" $2 $3 $4 >> $LOG_FILE 2>&1
  fi
}

killIe() {
  winExecute C:\\Windows\\system32\\taskkill.exe /IM iexplore.exe /F
}

trap "killIe; exit 0" EXIT

echo -e "\n\n\n----------------+ `date` +----------------\n" >> $LOG_FILE

captureUrl=$1

#winExecute "C:\\Program Files\\Internet Explorer\\iexplore.exe" ${captureUrl/localhost/192.168.1.93}
winExec "C:\\Users\\IEUser\\startie.vbs" ${captureUrl/localhost/192.168.1.93}