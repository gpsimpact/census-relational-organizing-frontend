#!/bin/sh

git checkout master
git pull
git remote prune origin
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
git branch -r --merged | grep -v master | sed 's/origin\///' | xargs -n 1 git push --delete origin
