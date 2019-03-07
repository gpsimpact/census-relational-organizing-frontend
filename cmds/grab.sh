echo "branching $1 to local"
git branch $1 origin/$1
git checkout $1