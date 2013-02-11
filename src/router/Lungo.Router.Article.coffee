###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Article

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Article = do(lng = Lungo) ->
  C = lng.Constants


  ###
  @todo   Describe method
  @method title
  ###
  title = (value) -> lng.Element.Cache.section.find(C.QUERY.TITLE).text value if value


  ###
  @todo   Describe method
  @method switchNavItems
  ###
  switchNavItems = (article_id) ->
    lng.Element.Cache.section.find(C.QUERY.NAVIGATION_ITEM).removeClass C.CLASS.ACTIVE
    active_nav_items = "a[href=\"" + article_id + "\"][data-router=\"article\"]"
    lng.Element.Cache.section.find(active_nav_items).addClass C.CLASS.ACTIVE
    if lng.Element.Cache.aside
      aside = lng.Element.Cache.aside
      aside.find(C.QUERY.ACTIVE_LIST_ITEM).removeClass C.CLASS.ACTIVE
      aside.find(active_nav_items).addClass(C.CLASS.ACTIVE).parent().addClass C.CLASS.ACTIVE


  ###
  @todo   Describe method
  @method switchReferenceItems
  ###
  switchReferenceItems = (article_id, section) ->
    reference = "[data-article=" + article_id.replace("#", "") + "]"
    section.find(C.QUERY.REFERENCE_LINK).hide().siblings(reference).show()

  title: title
  switchReferenceItems: switchReferenceItems
  switchNavItems: switchNavItems
