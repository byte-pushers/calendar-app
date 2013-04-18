#!/bin/bash
VBoxManage guestcontrol execute "IE9 - Win7" "C:\Program Files\Internet Explorer\iexplore.exe" --username "xxx" --password "xxx" --arguments "http://google.com/"
VBoxManage guestcontrol "IE9 - Win7" execute --image "cmd.exe" --username Guest -- "/c" "C:\Program Files\Internet Explorer\iexplore.exe" "http://google.com"
VBoxManage guestcontrol "IE9 - Win7" execute --image "C:\Program Files\Internet Explorer\iexplore.exe" --username IEUser --password Password1 -- "http://10.0.2.2:9876/"
VBoxManage guestcontrol "IE9 - Win7" execute --image "cmd.exe" --username IEUser --password Password1 -- "C:\Program Files\Internet Explorer\iexplore.exe" "http://google.com"
VBoxManage guestcontrol execute "Windows" "cmd.exe" --arguments "/c \"C:\Program Files\Internet Explorer\iexplore.exe\"" --arguments "http://www.google.com" --username USERNAME
VBoxManage guestcontrol "Windows XP (IE8)" execute --image "cmd.exe" --username MYUSER --password MYPASS --wait-exit -- "/c" "C:\Program Files\Internet Explorer\iexplore.exe" "http://google.com/"

VBoxManage guestcontrol "IE9 - Win7" execute --image "cmd.exe" --username Guest -- "/c" "C:\Program Files\Internet Explorer\iexplore.exe\" -- "http://10.0.2.2:9876/"
VBoxManage guestcontrol "IE9 - Win7" execute --image "cmd.exe" --username MYUSER --password MYPASS --wait-exit -- "/c" "http://google.com/"
VBoxManage guestcontrol "IE9 - Win7" execute --image "cmd.exe" --username MYUSER --password MYPASS --verbose --wait-exit -- "/c" "C:\Program Files\Internet Explorer\iexplore.exe" "http://google.com/"

VBoxManage startvm "IE9 - Win7"
VBoxManage guestcontrol "IE9 - Win7" execute --image "C:\Program Files\Internet Explorer\iexplore.exe" --username Guest --wait-exit -- "http://10.0.2.2:9876/"

VBoxManage guestcontrol "IE9 - Win7" execute --image "c:\\Windows\\system32\\cmd.exe" --username Guest --verbose --wait-exit -- "//c" -- "C:\\Program Files\\Internet Explorer\\iexplore.exe" -- "http://10.0.2.2:9876/"

VBoxManage guestcontrol "IE9 - Win7" execute --image "c:\\Windows\\system32\\cmd.exe" --username IEUser --verbose --wait-exit -- "//c" -- "C:\\Program Files\\Internet Explorer\\iexplore.exe" -- "http://10.0.2.2:9876/"
VBoxManage guestcontrol "IE9 - Win7" execute --image "C:\\Program Files\\Internet Explorer\\iexplore.exe" --username IEUser --verbose --wait-exit -- "http://10.0.2.2:9876/"

VBoxManage guestcontrol     <vmname>|<uuid>
                            exec[ute]
                            --image <path to program> --username <name>
                            [--passwordfile <file> | --password <password>]
                            [--domain <domain>] [--verbose] [--timeout <msec>]
                            [--environment "<NAME>=<VALUE> [<NAME>=<VALUE>]"]
                            [--wait-exit] [--wait-stdout] [--wait-stderr]
                            [--dos2unix] [--unix2dos]
                            [-- [<argument1>] ... [<argumentN>]]

                            copyfrom
                            <guest source> <host dest> --username <name>
                            [--passwordfile <file> | --password <password>]
                            [--domain <domain>] [--verbose]
                            [--dryrun] [--follow] [--recursive]

                            copyto|cp
                            <host source> <guest dest> --username <name>
                            [--passwordfile <file> | --password <password>]
                            [--domain <domain>] [--verbose]
                            [--dryrun] [--follow] [--recursive]

                            createdir[ectory]|mkdir|md
                            <guest directory>... --username <name>
                            [--passwordfile <file> | --password <password>]
                            [--domain <domain>] [--verbose]
                            [--parents] [--mode <mode>]

                            stat
                            <file>... --username <name>
                            [--passwordfile <file> | --password <password>]
                            [--domain <domain>] [--verbose]

                            updateadditions
                            [--source <guest additions .ISO>] [--verbose]
                            [--wait-start]