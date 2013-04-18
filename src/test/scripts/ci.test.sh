export DISPLAY=:1
Xvfb :1 &

#
# Fetch node and testacular if we don't have it already
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

#
# run the Angular.js tests (using a browser on the build server)
#

export PATH=$PATH:$node_home/bin

src/test/scripts/test.sh  #--single-run --browsers="Chrome,Firefox" --reporters="dots,junit" --no-colors

#
# skipping the Angular.js e2e tests (this requires a server too)
#

#node scripts/web-server.js > /dev/null &
#NODE_PID=$!
#src/test/scripts/e2e-test.sh --single-run --browsers="Chrome,Firefox" --reporters="dots,junit" --no-colors
#kill -s TERM $NODE_PID