###
Object with data-attributes (HTML5) with a special <markup>

@namespace Lungo
@class Constants

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Constants =
  ELEMENT:
    SECTION             : "section"
    ARTICLE             : "article"
    ASIDE               : "aside"
    MENU                : "menu"
    BODY                : "body"
    DIV                 : "div"
    LIST                : "<ul></ul>"
    LI                  : "li"

  QUERY:
    LIST_IN_ELEMENT     : "article.list, aside.list"
    ELEMENT_SCROLLABLE  : "aside.scroll, article.scroll"
    HREF_ASIDE          : "section[data-aside]"
    HREF_ROUTER         : "a[href][data-router]"
    MENU_HREF           : "[data-control=menu] a[href]"
    INPUT_CHECKBOX      : "input[type=range].checkbox"
    NAVIGATION_ITEM     : "a[href][data-router=\"article\"]"
    REFERENCE_LINK      : " a[href][data-article]"
    TITLE               : "header .title, footer .title"
    ACTIVE_LIST_ITEM    : "li a.active, li.active"


  CLASS:
    ACTIVE              : "active"
    ASIDE               : "aside"
    SHOW                : "show"
    HIDE                : "hide"
    HIDING              : "hiding"
    RIGHT               : "right"
    LEFT                : "left"
    HORIZONTAL          : "horizontal"
    SMALL               : "small"

  TRIGGER:
    LOAD                : "load"
    UNLOAD              : "unload"

  TRANSITION:
    DURATION            : 350
    ORIGIN              : "transition-origin"
    ATTR                : "transition"

  ATTRIBUTE:
    ID                  : "id"
    HREF                : "href"
    TITLE               : "title"
    ARTICLE             : "article"
    CLASS               : "class"
    WIDTH               : "width"
    HEIGHT              : "height"
    PIXEL               : "px"
    PERCENT             : "%"
    ROUTER              : "router"
    FIRST               : "first"
    LAST                : "last"
    EMPTY               : ""
    CHILDREN            : "children"
    TRANSITION          : "transition"

  BINDING:
    START               : "{{"
    END                 : "}}"
    KEY                 : "value"
    SELECTOR            : "{{value}}"

  DEVICE:
    PHONE               : "phone"
    TABLET              : "tablet"
    TV                  : "tv"

  ERROR:
    DATABASE            : "ERROR: Connecting to Data.Sql."
    DATABASE_TRANSACTION: "ERROR: Data.Sql >> "
    ROUTER              : "ERROR: The target does not exists >>"
    LOADING_RESOURCE    : "ERROR: Loading resource: "
