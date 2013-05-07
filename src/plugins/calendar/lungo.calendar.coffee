###
Lungo - HTML5 Cross-Device Framework
http://lungo.tapquo.com
Copyright (c) 2011-2013 Tapquo S.L. - Licensed GPLv3, Commercial

@namespace  Lungo.Sugar
@class      Calendar
@author     Ignacio Olalde Ramos <ina@tapquo.com> || @piniphone
@author     Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Sugar.Calendar = do () ->

  MONTHS = "January,February,March,April,May,June,July,August,September,October,November,December".split(",")
  WEEKDAYS = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
  DAYS = "31,0,31,30,31,31,30,31,30,31,30,31".split(",")

  _shadow = undefined
  _callback = undefined
  _container = undefined
  _element = undefined
  _value = undefined
  _calendarValue = undefined
  _blocked = false
  _config =
    startDay: 1
    format: "yyyy-mm-dd"

  _show = (event, value) ->
    do event?.preventDefault
    _element = $$ @
    unless value
      validValue = _element? and _element.val()? and _element.val() != ""
      _value = unless validValue then new Date() else _getDate(_element.val())
    else _value = _getDate value
    _openCalendar _value
    _shadow.addClass "show"

  hide = ->
    _container.attr "class", ""
    setTimeout (->_shadow.removeClass "show"), 200
    return

  _appendContainer = ->
    _container = $$ """
      <div data-control="calendar">
        <div class="layout horizontal">
          <div data-layout="primary">
            <span class="icon caret-left" data-action="previousMonth"></span>
            <strong data-calendar="month">xxx</strong>
            <span class="icon caret-right" data-action="nextMonth"></span>
          </div>
          <div data-layout="primary">
            <span class="icon caret-left" data-action="previousYear"></span>
            <strong data-calendar="year">yyy</strong>
            <span class="icon caret-right" data-action="nextYear"></span>
          </div>
        </div>
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </div>
    """
    do _headerRow
    $$("body").append _container

  _headerRow = ->
    headRow = do _createRow
    i = 0
    while i < 7
      day = (_config.startDay + i) % 7
      headRow.append _createDay "", "", WEEKDAYS[day]
      i++
    _container.find("thead").append headRow

  _bindEvents = ->
    _container.find("[data-action=previousMonth]").bind "tap", _goPreviousMonth
    _container.find("[data-action=nextMonth]").bind "tap", _goNextMonth
    _container.find("[data-action=previousYear]").bind "tap", _goPreviousYear
    _container.find("[data-action=nextYear]").bind "tap", _goNextYear
    $$("body").bind "tap", _checkTap

  _goPreviousMonth = ->
    _calendarValue.setDate(_calendarValue.getDate() - 30)
    _openCalendar _calendarValue

  _goNextMonth = ->
    _calendarValue.setDate(_calendarValue.getDate() + 30)
    _openCalendar _calendarValue

  _goPreviousYear = ->
    _calendarValue.setDate(_calendarValue.getDate() - 365)
    _openCalendar _calendarValue

  _goNextYear = ->
    _calendarValue.setDate(_calendarValue.getDate() + 365)
    _openCalendar _calendarValue

  _setValue = (event) ->
    td = $$ event.target
    val = _parseDate td.attr("data-calendar-day")
    unless val.split("-")[0] is ""
      do event.preventDefault
      _container.find(".today").removeClass('today')
      td.addClass "today"
      _element.val val
      if _callback then _callback.call @, val
      else do hide

  _getDate = (value) ->
    #@TODO :: _config.format...
    parts = value.split(/[-\/]/)
    return new Date(parts[0], parts[1]-1, parts[2])

  _parseDate = (strDate) ->
    #@TODO :: _config.format...
    parsed = ""
    parts = strDate.split("-")
    parts[1] = _to2Nums parts[1]
    parts[2] = _to2Nums parts[2]
    return parts.join("-")

  _to2Nums = (n) -> if n.length is 1 then "0#{n}" else n

  _checkTap = (event) ->
    if _blocked then return true
    target = $$(event.target)
    unless target.closest("[data-control=calendar], [data-type=calendar]").length
      ok = 1
      do hide

  _openCalendar = (date) ->
    year = date.getFullYear()
    month = date.getMonth()
    _calendarValue = new Date(year, month, 15)
    _bindContainerData _calendarValue
    monthDays = _getMonthDays year, month
    startPos = _getStartPosition new Date(year, month, 1).getDay()
    currentDay = 1
    started = false
    counter = 0
    tableBody = _container.find("tbody").html("")
    currentRow = do _createRow
    while currentDay < monthDays
      currentDate = new Date(year, month, currentDay)
      if not started
        if startPos is counter
          className = _getDayClassName(year, month, currentDay)
          currentRow.append _createDay(year, month, currentDay, className)
          started = true
        else currentRow.append _createDay year, month, "0", ["disabled"]
      else
        currentDay++
        className = _getDayClassName year, month, currentDay
        if counter % 7 is 0
          tableBody.append currentRow
          currentRow = do _createRow
        currentRow.append _createDay(year, month, currentDay, className)
      counter++

    tableBody.append currentRow if currentRow.children().length
    _container.find("[data-calendar-day]").bind "tap", _setValue
    _container.attr "class", "show"

  _getDayClassName = (y, m, d) ->
    classes = []
    dayValue = _value.getDate()
    isSameMonth = _value.getFullYear() is y and _value.getMonth() is m
    weekDay = new Date(y, m, d).getDay()
    if d is dayValue and isSameMonth then classes.push "today"
    if weekDay is 0 or weekDay is 6 then classes.push "weekend"
    classes

  _bindContainerData = (date) ->
    yearLabel = date.getFullYear()
    monthLabel = MONTHS[date.getMonth()]
    _container.find("[data-calendar=month]").html monthLabel
    _container.find("[data-calendar=year]").html yearLabel

  _createRow = () -> return $$("<tr>")

  _createDay = (year, month, day, className=[]) ->
    el = $$("<td data-calendar-day=\"#{year}-#{month+1}-#{day}\">")
    return el.html(day).attr("class", className.join(" "))

  _getStartPosition = (weekday) ->
    pos = weekday - _config.startDay
    if pos < 0 then pos + 7 else pos

  _getMonthDays = (y, m) ->
    if m is 1 then return _calcFebruaryDays y
    else return DAYS[m]

  _calcFebruaryDays = (y) ->
    isLeapYear = false
    if y % 4 is 0
      if y % 400 is 0 then isLeapYear = true
      else if y % 100 is 0 then isLeapYear = false
      else isLeapYear = true
    return if isLeapYear then 29 else 28

  show = (date, callback) ->
    _callback = callback
    _blocked = true
    setTimeout (-> _blocked = false), 100
    _show null, date

  $$ ->
    do _appendContainer
    do _bindEvents
    _shadow = $$(".notification")
    $$("input[data-type=calendar]").attr("readonly", "true").bind "tap", (event) ->
      _callback = undefined
      _show.call @, event


  show: show
  hide: hide

