echo $1
exists=`git show-ref refs/heads/$1`
if [ -n "$exists" ]; then
    git checkout $1
else 
    git checkout -b $1
fi