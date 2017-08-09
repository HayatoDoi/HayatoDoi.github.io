#!/usr/bin/env bash


cd markdown

# make array
list=()

ls *.md |
while read line; do
	list+=("aaa")
done

echo "["
echo "]"
echo "hh"
echo $list
echo ${#list[*]}
echo "hh"

list=()
list+=("aaa")

# output json
echo "["
for ((i = 0; i < ${#list[@]}; i++)) {
    echo "list[$i] = ${list[i]}"
}
echo "]"

# while read line
# do
#   echo "$line"
# done <test.txt

	# while read line do echo $line;done
