module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package/lungo/component.json"

    meta:
      file: 'lungo'
      package: "package",
      plugins: "src/plugins",
      # BETA
      endpoint: "example/components",
      version: ".brownie",
      # RELEASE
      # endpoint: "package",
      # version: "",
      banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
              '   <%= pkg.homepage %>\n' +
              '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
              ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n'

    source:
      coffee: [
        'src/Lungo.coffee',
        'src/modules/Lungo.Attributes.coffee',
        'src/modules/Lungo.Cache.coffee',
        'src/modules/Lungo.Constants.coffee',
        'src/modules/Lungo.Core.coffee',
        'src/modules/Lungo.Dom.coffee',
        'src/modules/Lungo.Events.coffee',
        'src/modules/Lungo.Fallback.coffee',
        'src/modules/Lungo.Init.coffee',
        'src/modules/Lungo.Notification.coffee',
        'src/modules/Lungo.Resource.coffee',
        'src/modules/Lungo.Scroll.coffee',
        'src/modules/Lungo.Service.coffee',
        # 'src/modules/Lungo.Router.coffee',
        'src/modules/Lungo.Router.Phone.coffee',
        'src/modules/Lungo.Router.Tablet.coffee',
        'src/modules/Lungo.Aside.coffee',
        'src/modules/Lungo.Section.coffee',
        'src/modules/Lungo.Article.coffee',
        'src/boot/*.coffee',
        'src/element/*.coffee']
      stylus: [
        'src/stylesheets/lungo.base.styl',
        'src/stylesheets/lungo.layout.styl',
        'src/stylesheets/lungo.layout.*.styl',
        'src/stylesheets/lungo.widget.styl',
        'src/stylesheets/lungo.widget.*.styl',
        'src/stylesheets/lungo.media.*.styl',
        'src/stylesheets/lungo.animation.styl',
        'src/stylesheets/lungo.animation.*.styl']
      theme: [
        'src/stylesheets/theme/theme.*.styl']
      icons: [
        'src/stylesheets/lungo.icon**.styl']
      calendar:
        coffee: 'src/plugins/calendar/**.coffee'
        stylus: 'src/plugins/calendar/**.styl'


    coffee:
      core: files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.debug.js': '<%= source.coffee %>'
      calendar: files: 'package/lungo.calendar/lungo.calendar.js': '<%= source.calendar.coffee %>'

    uglify:
      options: compress: false, banner: "<%= meta.banner %>"
      engine: files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.js': '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.debug.js'

    stylus:
      core:
        options: compress: true, import: [ '__init']
        files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.css': '<%=source.stylus%>'
      theme:
        options: compress: false, import: [ '__init']
        files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.theme.css': '<%=source.theme%>'
      icons:
        files: '<%=meta.package%>/<%=meta.file%>.icon/<%=meta.file%>.icon.css': '<%=source.icons%>'
      calendar:
        files: 'package/lungo.calendar/lungo.calendar.css': '<%=source.calendar.stylus%>'

    copy:
      theme:
        expand: true, flatten: true, src: '<%=source.theme%>', dest: '<%=meta.package%>/<%=meta.file%>.theme/'

    watch:
      coffee:
        files: ['<%= source.coffee %>']
        tasks: ["coffee:core"]
      stylus:
        files: ['<%= source.stylus %>', 'src/stylesheets/__init.styl',]
        tasks: ["stylus:core"]
      theme:
        files: ['<%= source.theme %>']
        tasks: ["stylus:theme"]

      calendar:
        files: ['<%= source.calendar.coffee %>','<%= source.calendar.stylus %>']
        tasks: ["coffee:calendar", "stylus:calendar"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["coffee", "uglify", "stylus", "copy"]
