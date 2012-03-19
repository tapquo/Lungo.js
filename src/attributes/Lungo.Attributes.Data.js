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
    Search: {
        tag: 'search',
        selector: '*',
        html: '<input type="search" placeholder="{{value}}"/><a href="#" class="button" data-icon="search"></a>'
    },
    Progress: {
        tag: 'progress',
        selector: '*',
        html: '<div class="progress" id="yeal">\
                    <span class="labels"><span></span><span></span></span>\
                    <span class="bar"><span class="value" style="width:{{value}};"><span class="glow"></span></span></span>\
                </div>'
    },
    Label: {
        tag: 'label',
        selector: 'a',
        html: '<abbr>{{value}}</abbr>'
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
        selector: 'header, footer, article',
        html: '<span class="title">{{value}}</span>'
    },
    Back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<a href="#back" data-target="section" class="onleft button default"><span class="icon {{value}}"></span></a>'
    }
};