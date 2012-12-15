#!/bin/sh
#define paths
COMPILER=google-compiler/compiler.jar
COMPRESSOR=yuicompressor/yuicompressor-2.4.2.jar
LUNGO_SOURCES=../src/
LUNGO_NAMESPACE=Lungo.
PACKAGE=../packages/package/
PACKAGE_THEME=../packages/package.theme/
MINIFIED="min"

# colors
alias decho='printf "\033[33m%s\033[0m\n"'
alias becho='printf "\033[32m%s\033[0m\n"'

mkdir -p ${PACKAGE} ${PACKAGE_THEME}
clear
decho "============================ LUNGO COMPILER ============================"

    ## Files to compile
    FILES_TO_COMPILE=""
    FILES_TO_JOIN=""

    #Main
    DIR=$LUNGO_SOURCES$LUNGO_NAMESPACE
    decho "  [DIR]: $LUNGO_SOURCES"
    FILES="js Init.js Core.js Dom.js Service.js Constants.js Events.js Notification.js Fallback.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Router
    DIR=$LUNGO_SOURCES"router/"$LUNGO_NAMESPACE"Router."
    decho "  [DIR]: ${LUNGO_SOURCES}router/"
    FILES="js History.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #View
    DIR=$LUNGO_SOURCES"view/"$LUNGO_NAMESPACE"View."
    decho "  [DIR]: ${LUNGO_SOURCES}view/"
    FILES="Article.js Aside.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #View
    DIR=$LUNGO_SOURCES"element/"$LUNGO_NAMESPACE"Element."
    decho "  [DIR]: ${LUNGO_SOURCES}element/"
    FILES="Cache.js Carousel.js Count.js Loading.js Progress.js Pull.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Data
    DIR=$LUNGO_SOURCES"data/"$LUNGO_NAMESPACE"Data."
    decho "  [DIR]: ${LUNGO_SOURCES}data/"

    FILES="Cache.js Sql.js Storage.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Attributes
    DIR=$LUNGO_SOURCES"attributes/"$LUNGO_NAMESPACE"Attributes."
    decho "  [DIR]: "$LUNGO_SOURCES"attributes/"
    FILES="Data.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #Boot
    DIR=$LUNGO_SOURCES"boot/"$LUNGO_NAMESPACE"Boot."
    decho "  [DIR]: ${LUNGO_SOURCES}boot/"
    FILES="Resources.js Stats.js Layout.js Events.js Data.js Section.js Article.js"
    for file in ${FILES} ; do
        FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
        FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
    done

    #COMPILED Version
    #FILES_TO_COMPILE=" --js "$LUNGO_SOURCES"lib/quo.debug.js "$FILES_TO_COMPILE
    java -jar $COMPILER $FILES_TO_COMPILE --js_output_file $PACKAGE/lungo.js
    # cat $LUNGO_SOURCES"lib/quo.debug.js" $PACKAGE/lungo-$VERSION.standalone.js > $PACKAGE/lungo-$VERSION.js
    becho "  [BUILD]: lungo.js"

    FILES_TO_COMPRESS=""
    DIR=$LUNGO_SOURCES"stylesheets/css/"

    decho "  [DIR]: $DIR >> COMPRESSING"
    FILES="base layout layout.nav layout.aside layout.article layout.list layout.grid widgets widgets.splash widgets.button widgets.form widgets.loading widgets.notification widgets.pull"
    for file in ${FILES} ; do
        # echo "    - Compressing "$DIR$LUNGO_NAMESPACE$file".css ..."
        #Compressing via YUI
        java -jar $COMPRESSOR $DIR$LUNGO_NAMESPACE$file".css" -o $DIR$LUNGO_NAMESPACE$file".min.css"
        FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".min.css"
        # FILES_TO_COMPRESS=$FILES_TO_COMPRESS" "$DIR$LUNGO_NAMESPACE$file".css"
    done
    cat $FILES_TO_COMPRESS > $PACKAGE/lungo.css
    becho "    [BUILD]: lungo.css"

    for file in ${FILES} ; do
       rm $DIR$LUNGO_NAMESPACE$file".min.css"
    done

    DIR=$LUNGO_SOURCES"stylesheets/css/"
    FILES="css brand.css"
    for file in ${FILES} ; do
        becho "    [BUILD]: lungo.icon.$file"
        cp $DIR"Lungo.widgets.icon."$file $PACKAGE'lungo.icon.'$file
    done

    FILES="default.css"
    for file in ${FILES} ; do
        becho "    [BUILD]: lungo.theme.$file"
        cp $DIR"Lungo.theme."$file $PACKAGE'lungo.theme.'$file
    done

    DIR=$LUNGO_SOURCES"stylesheets/"
    FILES="lungo.theme.default.styl vendor.styl"
    for file in ${FILES} ; do
        becho "    [COPY]: $file"
        cp $DIR$file $PACKAGE_THEME$file
    done
decho "============================ /LUNGO COMPILER ============================"
