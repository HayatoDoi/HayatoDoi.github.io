#!/usr/bin/env bash

# Generate Markdown list
getMarkdownList(){
	cd markdown &&
	ls *.md |
	while read line; do
		echo $line
	done
}

# file found
if [ -e articles-list ]; then
	if ! getMarkdownList | diff -u - articles-list > /dev/null ;then
		echo "-----------------------------------------------------"
		getMarkdownList | diff --suppress-common-lines - articles-list
		echo "-----------------------------------------------------"
		getMarkdownList > articles-list
		echo "There was a change in the DB. Update the DB."
	else
		echo "The DB is the latest version"
	fi
# file not found
else
	echo "-----------------------------------------------------"
	getMarkdownList
	echo "-----------------------------------------------------"
	getMarkdownList > articles-list
	echo "Create a DB"
fi
