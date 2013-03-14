###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Article

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Article = do(lng = Lungo) ->
  C = lng.Constants

  ###
  Clean the content of a particular article with a specific markup
  @method clean
  @param  {string} Article ID
  @param  {string} Icon
  @param  {string} Title
  @param  {string} Description [OPTIONAL]
  @param  {string} Button label [OPTIONAL]
  ###
  clean = (id, icon, title, description = "", button = null) ->
    if el = lng.dom "#{C.ELEMENT.ARTICLE}##{id}"
      markup = ""
      if icon? then markup = """<div class="empty">
                                  <span class="icon #{icon}"></span>
                                  <strong>#{title}</strong>
                                  <small>#{description}</small>
                                </div>"""
      el.html markup
      if button then el.children().append "<button class='anchor'><abbr>#{button}</abbr></button>"

  clean: clean
