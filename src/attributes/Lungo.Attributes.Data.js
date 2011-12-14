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
    search: {
        tag: 'search',
        selector: '.list',
        html: '<li class="search {{value}}"><input type="search" placeholder="Search..."><a href="#" class="button" data-icon="search"></a></li>'
    },
    icon: {
        tag: 'icon',
        selector: '*',
        html: '<span class="icon {{value}}"></span>'
    },
    image: {
        tag: 'image',
        selector: '*',
        html: '<img src="{{value}}" class="icon" />'
    },
    title: {
        tag: 'title',
        selector: 'header, footer',
        html: '<h1 class="title">{{value}}</h1>'
    },
    back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<a href="#back" data-target="section" class="back onleft button icon {{value}}"></a>'
    }
};