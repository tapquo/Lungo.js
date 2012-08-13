#!/bin/bash
VERSION="2.0"

#define paths
COMPILER=google-compiler/compiler.jar
COMPRESSOR=yuicompressor/yuicompressor-2.4.2.jar
LUNGO_SOURCES=../src/
LUNGO_NAMESPACE=Lungo.
BUILDPATH=../release/
MINIFIED="min"

#script
clear
echo -e "\033[0m"============================ LUNGO COMPILER ============================

    ## Files to compile
    FILES_TO_COMPILE=""
    FILES_TO_JOIN=""

    #Main
    DIR=$LUNGO_SOURCES$LUNGO_NAMESPACE
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES
    FILES=(js Constants.js App.js Core.js Dom.js Service.js Element.js Fallback.js Events.js)
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
    FILES=(Article.js Resize.js Template.js Template.Binding.js Template.List.js Aside.js Element.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Attributes
    DIR=$LUNGO_SOURCES"attributes/"$LUNGO_NAMESPACE"Attributes."
    echo -e "\033[33m  [DIR]: "$LUNGO_SOURCES"attributes/"
    FILES=(Data.js)
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
    FILES=(js Resources.js Stats.js Layout.js Article.js Data.js Events.js Section.js)
    for file in "${FILES[@]}"
    do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #COMPILED Version
    FILES_TO_COMPILE=" --js "$LUNGO_SOURCES"lib/QuoJS.js "$FILES_TO_COMPILE
    java -jar $COMPILER $FILES_TO_COMPILE --js_output_file $BUILDPATH/lungo-$VERSION.js
    echo -e "\033[32m  [BUILD]: lungo-"$VERSION.js"\033[0m"


FILES_TO_COMPRESS=""
    DIR=$LUNGO_SOURCES"stylesheets/css/"

    echo -e "\033[33m  [DIR]: "$DIR
    FILES=(base layout layout.nav layout.aside layout.article layout.list widgets widgets.splash widgets.button widgets.form widgets.colour widgets.loading )
    for file in "${FILES[@]}"
    do
        echo "    - Compressing "$DIR$LUNGO_NAMESPACE$file".css ..."
        #Compressing via YUI
        #java -jar $COMPRESSOR $DIR$LUNGO_NAMESPACE$file".css" -o $DIR$LUNGO_NAMESPACE$file".min.css"
        #FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".min.css"

        FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".css"
    done
    FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE"widgets.icon.css"
	cat $FILES_TO_COMPRESS > $BUILDPATH/lungo-$VERSION.css

    #for file in "${FILES[@]}"
    #do
    #    rm $DIR$LUNGO_NAMESPACE$file".min.css"
    #done

	DIR=$LUNGO_SOURCES"stylesheets/css/"
	FILES=(default.css default.font.css scaffold.css)
	echo -e "\033[33m  [DIR]: "$DIR
	for file in "${FILES[@]}"
	do
		echo "   - [THEME] "$file
		cp $DIR"lungo.theme."$file $BUILDPATH'lungo.theme.'$file
	done
	echo -e "\033[32m  [BUILD]: lungo-"$VERSION.".css\033[0m"
echo ============================ /LUNGO COMPILER ============================
