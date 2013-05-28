module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "packages/lungo/component.json"

    meta:
      file: 'lungo'
      packages: "packages",
      plugins: "src/plugins",
      # BETA
      endpoint: "example/components",
      version: ".brownie",
      # RELEASE
      # endpoint: "packages",
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
        'src/modules/Lungo.Router.coffee',
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
      theme_firefoxos: [
        'src/stylesheets/theme/firefoxos/theme.*.styl']
      icons: [
        'src/stylesheets/lungo.icon**.styl']
      calendar:
        coffee: 'src/plugins/calendar/**.coffee'
        stylus: 'src/plugins/calendar/**.styl'


    coffee:
      core: files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.debug.js': '<%= source.coffee %>'
      calendar: files: 'packages/lungo.calendar/lungo.calendar.js': '<%= source.calendar.coffee %>'

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
      theme_firefoxos:
        options: compress: true, import: [ '__init']
        files: '<%=meta.packages%>/<%=meta.file%>.firefoxos/<%=meta.file%>.firefoxos.theme.css': '<%=source.theme_firefoxos%>'
      icons:
        files: '<%=meta.packages%>/<%=meta.file%>.icon/<%=meta.file%>.icon.css': '<%=source.icons%>'
      calendar:
        files: 'packages/lungo.calendar/lungo.calendar.css': '<%=source.calendar.stylus%>'

    copy:
      theme:
        expand: true, flatten: true, src: '<%=source.theme%>', dest: '<%=meta.packages%>/<%=meta.file%>.theme/'

    watch:
      coffee:
        files: ['<%= source.coffee %>']
        tasks: ["coffee:core"]
      stylus:
        files: ['<%= source.stylus %>']
        tasks: ["stylus:core"]
      theme:
        files: ['<%= source.theme %>']
        tasks: ["stylus:theme"]
      theme_firefoxos:
        files: ['<%= source.theme_firefoxos %>']
        tasks: ["stylus:theme_firefoxos"]

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
