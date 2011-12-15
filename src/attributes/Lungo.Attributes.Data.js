/**
 * Object with data-attributes (HTML5) with a special <markup>
 *
 * @namespace LUNGO.Attributes
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Attributes.Data = {
    Search: {
        tag: 'search',
        selector: '.list',
        html: '<li class="search {{value}}"><input type="search" placeholder="Search..."><a href="#" class="button" data-icon="search"></a></li>'
    },
    Count: {
        tag: 'count',
        selector: '*',
        html: '<span class="bubble count">{{value}}</span>'
    },
    Icon: {
        tag: 'icon',
        selector: '*',
        html: '<span class="icon {{value}}"></span>'
    },
    Image: {
        tag: 'image',
        selector: '*',
        html: '<img src="{{value}}" class="icon" />'
    },
    Title: {
        tag: 'title',
        selector: 'header, footer',
        html: '<h1 class="title">{{value}}</h1>'
    },
    Back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<a href="#back" data-target="section" class="back onleft button icon {{value}}"></a>'
    }
};