#!/bin/bash

. scripts/version.sh

function waitForServer {
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
docker run -i -p 8080:8080 -p 8443:8443 ${APIMAN} > apiman.log 2>&1 &
sleep 1
waitForServer