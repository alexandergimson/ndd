#!/bin/bash

# Stop on first error
set -e

# Build & deploy
npm run build
npm run deploy

# Git add
git add .

# Ask for commit message
echo "Write a commit message:"
read commit_message

# Commit and push
git commit -m "$commit_message"
git push origin main
