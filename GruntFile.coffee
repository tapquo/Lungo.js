module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "packages/lungo/component.json"

    meta:
      file: 'lungo'
      packages: "packages",
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


    resources:
      core: ['src/Lungo.coffee']
      modules: [
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
      javascripts: [
        'build/*.js']
      stylesheets: [
        'src/stylesheets/lungo.base.styl',
        'src/stylesheets/lungo.layout.styl',
        'src/stylesheets/lungo.layout.*.styl',
        'src/stylesheets/lungo.widget.styl',
        'src/stylesheets/lungo.widget.*.styl',
        'src/stylesheets/lungo.media.*.styl']
      theme: [
        'src/stylesheets/theme/*.styl']

      icons: [
        'src/stylesheets/lungo.icon**.styl']

    coffee:
      compile:
        files:
          'build/<%= meta.file %>.core.js': ['<%= resources.core %>']
          'build/<%= meta.file %>.modules.js': ['<%= resources.modules %>']

    concat:
      dist:
        src: ['<%= resources.javascripts %>'],
        dest:  '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.debug.js'

    uglify:
      options:
        compress: false
        banner: '<%= meta.banner %>'
      endpoint:
        files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.js': '<%=resources.javascripts %>'

    stylus:
      stylesheets:
        files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.css': '<%=resources.stylesheets%>'
      theme:
        options: compress: true
        files: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.theme.css': '<%=resources.theme%>'
      icons:
        files: '<%=meta.packages%>/<%=meta.file%>.icon/<%=meta.file%>.icon.css': '<%=resources.icons%>'

    copy:
      theme:
        expand: true, flatten: true, src: '<%=resources.theme%>', dest: '<%=meta.packages%>/<%=meta.file%>.theme/'

    watch:
      coffee:
        files: ['<%= resources.core %>', '<%= resources.modules %>']
        tasks: ["coffee", "concat"]
      stylus:
        files: ['<%= resources.stylesheets %>', '<%= resources.theme %>']
        tasks: ["stylus:stylesheets", "stylus:theme"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["coffee", "concat", "uglify", "stylus", "copy"]
