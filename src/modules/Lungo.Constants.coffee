###
Object with data-attributes (HTML5) with a special <markup>

@namespace Lungo
@class Constants

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Constants =
  ELEMENT:
    SECTION              : "section"
    ARTICLE              : "article"
    ASIDE                : "aside"
    BODY                 : "body"
    DIV                  : "div"
    LIST                 : "<ul></ul>"
    LI                   : "li"

  CONTROL:
    MENU                 : "[data-control=menu]"

  QUERY:
    ARTICLE_ROUTER       : "[data-view-article]"
    SECTION_ROUTER       : "[data-view-section]"
    ARTICLE_ROUTER_TOUCH : "header [data-view-article], footer [data-view-article], nav[data-control] [data-view-article]"
    SECTION_ROUTER_TOUCH : "header [data-view-section], footer [data-view-section], nav[data-control] [data-view-section]"
    ARTICLE_ROUTER_TAP   : "article [data-view-article]"
    SECTION_ROUTER_TAP   : "article [data-view-section]"
    ASIDE_ROUTER         : "[data-view-aside]"
    MENU_ROUTER          : "[data-view-menu]"

    LIST_IN_ELEMENT      : "article.list"
    ELEMENT_SCROLLABLE   : "article.scroll"
    HREF_ASIDE           : "section[data-aside].drag"
    HREF_ROUTER          : "a[href][data-router]"
    MENU_HREF            : "[data-control=menu] a[href]"
    CONTROL_CHECKBOX     : "[data-control-checkbox]"
    NAVIGATION_ITEM      : "a[href][data-router=\"article\"]"
    ARTICLE_REFERENCE    : "[data-article]"
    TITLE                : "header .title, footer .title"
    ACTIVE_LIST_ITEM     : "li a.active, li.active"

  CLASS:
    ACTIVE               : "active"
    ASIDE                : "aside"
    SHOW                 : "show"
    HIDE                 : "hide"
    HIDING               : "hiding"
    RIGHT                : "right"
    LEFT                 : "left"
    HORIZONTAL           : "horizontal"
    SMALL                : "small"
    LAST                 : "last"

  TRIGGER:
    LOAD                 : "load"
    UNLOAD               : "unload"

  EVENT:
    TRANSITION_END       : ["webkitAnimationEnd", "animationend"]
    CHANGE               : "change"

  TRANSITION:
    DURATION             : 400
    ORIGIN               : "transition-origin"
    ATTR                 : "transition"

  ASIDE:
    NORMAL               : 264


  ATTRIBUTE:
    ID                   : "id"
    HREF                 : "href"
    TITLE                : "title"
    ARTICLE              : "article"
    CLASS                : "class"
    WIDTH                : "width"
    HEIGHT               : "height"
    PIXEL                : "px"
    PERCENT              : "%"
    ROUTER               : "router"
    FIRST                : "first"
    LAST                 : "last"
    EMPTY                : ""
    CHILDREN             : "children"
    TRANSITION           : "transition"
    STATE                : "state"
    DIRECTION            : "direction"

  BINDING:
    START                : "{{"
    END                  : "}}"
    KEY                  : "value"
    SELECTOR             : "{{value}}"

  DEVICE:
    PHONE                : "phone"
    TABLET               : "tablet"
    TV                   : "tv"

  ERROR:
    DATABASE             : "ERROR: Connecting to Data.Sql."
    DATABASE_TRANSACTION : "ERROR: Data.Sql >> "
    ROUTER               : "ERROR: The target does not exists >>"
    LOADING_RESOURCE     : "ERROR: Loading resource: "

