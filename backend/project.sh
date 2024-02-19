#!/bin/bash

mkdir ${2}
cd ${2} 
git clone ${1} 
cd ${3}
npm install
npm run build

