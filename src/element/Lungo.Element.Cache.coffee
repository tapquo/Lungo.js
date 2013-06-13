###
DOM Elements caching

@namespace Lungo.Element
@class Cache

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.Cache =

  section: null
  article: null
  aside: null
  navigation: null

  dump: ->
    txt = ""
    txt += "================ cache data ================\n"
    txt += " SECTION:    #{@section?.attr('id')}\n"
    txt += " ARTICLE:    #{@article?.attr('id')}\n"
    txt += " ASIDE:      #{@aside?.attr('id')}\n"
    txt += " NAVIGATION: #{@navigation?.attr('id')}\n"
    txt += "============================================\n"
    console.error txt
