#!/bin/bash

set -e

yarn --version || (echo "Install Yarn: npm install -g yarn" && exit 1)

# Install main packages
yarn

# Install test packages
cd test/react-15
yarn
