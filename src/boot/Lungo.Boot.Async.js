/**
 * Load Async sections
 *
 * @namespace LUNGO
 * @class App
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Boot.Async = (function(lng, $$, undefined) {

    /**
     * Start loading async sections (local & remote)
     *
     * @method start
     *
     */
    var start = function() {
        var async_sections = lng.App.get('sections');

        if (async_sections) {
            for (section in async_sections) {
                var url = _parseUrl(async_sections[section])
                var response = _loadAsyncSection(url);
                _pushSectionInLayout(response);
            }
        }
    };

    var _parseUrl = function(section_url) {
        return (/http/.test(section_url)) ? section_url : 'app/sections/' + section_url;
    };

    var _loadAsyncSection = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error('[ERROR] Loading url', arguments);
            }
        });
    };

    var _pushSectionInLayout = function(section) {
        if (lng.Core.toType(section) === 'string') {
            lng.dom('body').append(section);
        }
    };

    return {
        start: start
    };

})(LUNGO, Quo);