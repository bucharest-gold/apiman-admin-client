#!/bin/bash

. build/version.sh

function waitForServer {
  # Give the server some time to start up. Look for a well-known
  # bit of text in the log file. Try at most 50 times before giving up.
  C=50
  while [ $C -gt 0 ]
  do
    grep "apiman-es started!" apiman.log
    if [ $? -eq 0 ]; then
      echo "Server started."
      C=0
    else
      echo -n "."
      C=$(( $C - 1 ))
    fi
    sleep 1
  done
}

docker pull ${APIMAN}
docker run -i -p 8080:8080 -p 8443:8443 ${APIMAN} > ../apiman.log 2>&1 &

waitForServer