#!/bin/bash

source /etc/profile.d/vesta.sh
source $VESTA/conf/vesta.conf
if [ -z "$IPV4" ]; then
  echo "IPV4='yes'" >> $VESTA/conf/vesta.conf
  ip_list=$(ls --sort=time $VESTA/data/ips/)
  for IP in $ip_list; do
    ip_data=$(cat $VESTA/data/ips/$IP)
    eval $ip_data
    if [ -z "$VERSION" ]; then
      echo "VERSION='4'" >> $VESTA/data/ips/$IP
    fi
  done
fi
if [ -z "$IPV6" ]; then
  echo "IPV6='no'" >> $VESTA/conf/vesta.conf
fi