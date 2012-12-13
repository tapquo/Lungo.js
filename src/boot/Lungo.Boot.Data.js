/**
 * Make an analysis of Data attributes in HTML elements in whole document
 * and creates a <markup> based on each data type.
 *
 * @namespace Lungo.Boot
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 * @author Marcin Ciunelis <marcin.ciunelis@gmail.com> || @martinciu
 */

Lungo.Boot.Data = (function(lng, undefined) {

    /**
     * Initialize the <markup> data-attributes analisys
     *
     * @method init
     *
     *
     */
    var init = function() {
        Lungo.Attributes.init(lng.dom(document));
    };

    return {
        init: init
    };

})(Lungo);
