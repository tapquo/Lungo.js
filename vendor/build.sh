#!/bin/bash
VERSION="1.0.3"

#define paths
COMPILER=google-compiler/compiler.jar
COMPRESSOR=yuicompressor/yuicompressor-2.4.2.jar
LUNGO_SOURCES=../src/
LUNGO_NAMESPACE=Lungo.
BUILDPATH=../release/
MINIFIED="min"
PACKED="packed"

#script
clear
echo -e "\033[0m"============================ LUNGO COMPILER ============================
echo -e "Do you wish to compile LungoJS Framework? (Y)es or (N)o?: \c "
read WISH
if [[ $WISH == "Y" || $WISH == "y" ]] ; then
    ## Files to compile
    FILES_TO_COMPILE=""
    FILES_TO_JOIN=""

    #Main
    DIR=$LUNGO_SOURCES$LUNGO_NAMESPACE
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES
    FILES=(js App.js Environment.js Core.js Events.js Service.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Router
    DIR=$LUNGO_SOURCES"router/"$LUNGO_NAMESPACE"Router."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"router/"
    FILES=(js History.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #View
    DIR=$LUNGO_SOURCES"view/"$LUNGO_NAMESPACE"View."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"view/"
    FILES=(Article.js Resize.js Template.js Template.Binding.js Template.List.js Scroll.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Dom
    DIR=$LUNGO_SOURCES"dom/"$LUNGO_NAMESPACE"Dom."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"dom/"
    FILES=(js Event.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Attributes
    DIR=$LUNGO_SOURCES"attributes/"$LUNGO_NAMESPACE"Attributes."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"attributes/"
    FILES=(Data.js Section.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Data
    DIR=$LUNGO_SOURCES"data/"$LUNGO_NAMESPACE"Data."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"data/"
    FILES=(Cache.js Sql.js Storage.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Dom
    DIR=$LUNGO_SOURCES"boot/"$LUNGO_NAMESPACE"Boot."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"boot/"
    FILES=(js Layout.js Article.js Data.js Events.js Section.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #UNCOMPRESED Version
    cat $FILES_TO_JOIN > $BUILDPATH/lungo-$VERSION.js
    echo -e "\033[32m  [BUILD]: lungo-"$VERSION.js"\033[0m"

    #MINIFIED Version
    java -jar $COMPILER $FILES_TO_COMPILE --js_output_file $BUILDPATH/lungo-$VERSION.$MINIFIED.js
    echo -e "\033[32m  [BUILD]: lungo-"$VERSION.$MINIFIED.js"\033[0m"

    #PACKED Version
    FILES_TO_COMPILE=" --js "$LUNGO_SOURCES"lib/zepto.js --js "$LUNGO_SOURCES"lib/iscroll.js"$FILES_TO_COMPILE
    java -jar $COMPILER $FILES_TO_COMPILE --js_output_file $BUILDPATH/lungo-$VERSION.$PACKED.js
    echo -e "\033[32m  [BUILD]: lungo-"$VERSION.$PACKED.js"\033[0m"
fi

FILES_TO_COMPRESS=""
echo -e "Do you wish to compress your STYLESHEETS? (Y)es or (N)o?: \c "
read WISH
if [[ $WISH == "Y" || $WISH == "y" ]] ; then
    DIR=$LUNGO_SOURCES"stylesheets/css/"

    echo -e "\033[33m  [DIR]: "$DIR
    FILES=(base layout layout.list widgets widgets.splash widgets.button widgets.form widgets.colour )
    for file in "${FILES[@]}"
    do
        echo "    - Compressing "$DIR$LUNGO_NAMESPACE$file".css ..."
        #FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".css"

        java -jar $COMPRESSOR $DIR$LUNGO_NAMESPACE$file".css" -o $DIR$LUNGO_NAMESPACE$file".min.css"
        FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".min.css"
    done
    FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE"widgets.icon.css"
	cat $FILES_TO_COMPRESS > $BUILDPATH/lungo-$VERSION.$MINIFIED.css

    for file in "${FILES[@]}"
    do
        rm $DIR$LUNGO_NAMESPACE$file".min.css"
    done

	DIR=$LUNGO_SOURCES"stylesheets/css/"
	FILES=(default.css)
	echo -e "\033[33m  [DIR]: "$DIR
	for file in "${FILES[@]}"
	do
		echo "   - [THEME] "$file
		cp $DIR"lungo.theme."$file $BUILDPATH'lungo.theme.'$file
	done
	echo -e "\033[32m  [BUILD]: lungo-"$VERSION.$MINIFIED".css\033[0m"
fi
echo ============================ /LUNGO COMPILER ============================