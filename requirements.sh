#!/bin/bash

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install it first."
    exit
fi

if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install it first."
    exit
fi

# Install Angular CLI
npm install -g @angular/cli

# Install Express Generator
npm install -g express-generator

# Install mathjs for the advanced calculator functionality
npm install mathjs

echo "All required npm packages have been installed!"
