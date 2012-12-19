/**
 * Object with data-attributes (HTML5) with a special <markup>
 *
 * @namespace Lungo
 * @class Constants
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Constants = {

    ELEMENT: {
        SECTION: 'section',
        ARTICLE: 'article',
        ASIDE: 'aside',
        BODY: 'body',
        DIV: 'div',
        LIST: '<ul></ul>',
        LI: 'li'
    },

    QUERY: {
        LIST_IN_ARTICLE: 'article.list, aside.list',
        ARTICLE_SCROLLABLE: 'article.scroll'
    },

    CLASS: {
        ACTIVE: 'active',
        ASIDE: 'aside',
        SHOW: 'show',
        HIDE: 'hide',
        HIDING: 'hiding',
        RIGHT: 'right',
        LEFT: 'left',
        HORIZONTAL: 'horizontal',
        SMALL: 'small'
    },

    TRIGGER: {
        LOAD: 'load',
        UNLOAD: 'unload'
    },

    TRANSITION: {
        DURATION: 350
    },

    ATTRIBUTE: {
        ID: 'id',
        HREF: 'href',
        TITLE: 'title',
        ARTICLE: 'article',
        CLASS: 'class',
        WIDTH: 'width',
        HEIGHT: 'height',
        PIXEL: 'px',
        PERCENT: '%',
        ROUTER: 'router',
        FIRST: 'first',
        LAST: 'last',
        EMPTY: ''
    },

    BINDING: {
        START: '{{',
        END: '}}',
        KEY: 'value',
        SELECTOR: '{{value}}'
    },

    ERROR: {
        DATABASE: 'ERROR: Connecting to Data.Sql.',
        DATABASE_TRANSACTION: 'ERROR: Data.Sql >> ',
        ROUTER: 'ERROR: The target does not exists >>',
        LOADING_RESOURCE: 'ERROR: Loading resource: '
    }

};
