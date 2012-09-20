/**
 * Object with data-attributes (HTML5) with a special <markup>
 *
 * @namespace Lungo.Attributes
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Attributes.Data = {
    Search: {
        tag: 'search',
        selector: '*',
        html: '<input type="search" placeholder="{{value}}"/><a href="#" class="button" data-icon="search"></a>'
    },
    Count: {
        tag: 'count',
        selector: '*',
        html: '<span class="bubble count">{{value}}</span>'
    },
    Progress: {
        tag: 'progress',
        selector: '*',
        html: '<div class="progress">\
                    <span class="bar"><span class="value" style="width:{{value}};"><span class="label"></span></span></span>\
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
        html: '<span class="title centered">{{value}}</span>'
    },
    Loading: {
        tag: 'loading',
        selector: '*',
        html: '<div class="loading {{value}}">\
                    <span class="top"></span>\
                    <span class="right"></span>\
                    <span class="bottom"></span>\
                    <span class="left"></span>\
                </div>'
    },
    Back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<nav class="left"><a href="#back" data-router="section" class="left"><span class="icon {{value}}"></span></a></nav>'
    }
};
