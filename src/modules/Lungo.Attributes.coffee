###
Object with data-attributes (HTML5) with a special <markup>

@namespace Lungo
@class Attributes

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###
Lungo.Attributes =
  count:
    selector: "*"
    html: "<span class=\"tag count\">{{value}}</span>"

  pull:
    selector: "*"
    html: """
      <div data-control=\"pull\" data-icon=\"{{value}}\" data-loading>
        <strong></strong>
      </div>"""

  progress:
    selector: "*"
    html: """
      <div class=\"progress\">
        <span class=\"bar\"><span class=\"value\" style=\"width:{{value}};\"></span></span>
      </div>"""

  label:
    selector: "*"
    html: "<abbr>{{value}}</abbr>"

  icon:
    selector: "*"
    html: "<span class=\"icon {{value}}\"></span>"

  image:
    selector: "*"
    html: "<img src=\"{{value}}\" class=\"icon\" />"

  title:
    selector: "header"
    html: "<h1 class=\"title centered\">{{value}}</h1>"

  loading:
    selector: "*"
    html: """
      <div class=\"loading {{value}}\">
        <span class=\"top\"></span>
        <span class=\"right\"></span>
        <span class=\"bottom\"></span>
        <span class=\"left\"></span>
      </div>"""

  back:
    selector: "header"
    html: "<nav class=\"left\"><a href=\"#\" data-view-section=\"back\"><span class=\"icon {{value}}\"></span></a></nav>"
