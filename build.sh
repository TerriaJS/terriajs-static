#!/bin/bash
rsync -a ${PWD}/node_modules/terriajs-static/assets/. ${PWD}/pages/assets/
echo "$@"

if [[ "$@" == "--watch" ]]
then 
  node ${PWD}/node_modules/cuttlebelle watch
else 
  node ${PWD}/node_modules/cuttlebelle
fi