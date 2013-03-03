module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:packages/lungo/component.json>',

    meta: {
        file: "lungo",
        // BETA
        endpoint: "example/components",
        version: ".brownie",
        // RELEASE
        // endpoint: "packages",
        // version: "",
        banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
                '   <%= pkg.homepage %>\n' +
                '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */'
    },

    resources: {
        coffeescripts: ['src/**/*.coffee'],
        core: ['build/src/Lungo.js'],
        modules: [
          'build/src/Lungo.js',
          'build/src/modules/Lungo.Attributes.js',
          'build/src/modules/Lungo.Cache.js',
          'build/src/modules/Lungo.Constants.js',
          'build/src/modules/Lungo.Core.js',
          'build/src/modules/Lungo.Dom.js',
          'build/src/modules/Lungo.Events.js',
          'build/src/modules/Lungo.Fallback.js',
          'build/src/modules/Lungo.Init.js',
          'build/src/modules/Lungo.Notification.js',
          'build/src/modules/Lungo.Resource.js',
          'build/src/modules/Lungo.Scroll.js',
          'build/src/modules/Lungo.Service.js',
          'build/src/modules/Lungo.Router.js',
          'build/src/modules/Lungo.Aside.js',
          'build/src/modules/Lungo.Section.js',
          'build/src/boot/*.js',
          'build/src/element/*.js'],
        stylesheets: [
            'src/**/lungo.base.styl',
            'src/**/lungo.layout.styl',
            'src/**/lungo.layout.*.styl',
            'src/**/lungo.widgets.styl',
            'src/**/lungo.widgets.*.styl',
            'src/**/lungo.media.*.styl'],
        icons: ['src/**/lungo.icon**.styl'],
        themes: ['src/**/theme**.styl']
    },

    coffee: {
      lungo: {
        src: ['<config:resources.coffeescripts>'],
        dest: 'build',
        options: {
            bare: true,
            preserve_dirs: true
        }
      }
    },

    concat: {
      js: {
        src: ['<banner>', '<config:resources.core>', '<config:resources.modules>'],
        dest: 'build/<%=meta.file%>.js'
      }
    },

    min: {
      js: {
        src: ['<banner>', 'build/<%=meta.file%>.js'],
        dest: '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.js'
      }
    },

    stylus: {
      stylesheets: {
        options: { compress: true, paths: ['src/stylesheets/import'] },
        files: { '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/<%=meta.file%>.css': '<config:resources.stylesheets>' }
      },
      icons: {
        options: { compress: true },
        files: { '<%=meta.endpoint%>/<%=meta.file%>.icon/**.css': '<config:resources.icons>' }
      },
      themes: {
        options: { flatten: true },
        files: { '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/**.css': '<config:resources.themes>' }
      }
    },

    copy: {
      theme: {
        files: { '<%=meta.endpoint%>/<%=meta.file%>.theme/': ['<config:resources.themes>'] }
      }
    },

    watch: {
      files: ['<config:resources.coffeescripts>', '<config:resources.stylesheets>', '<config:resources.themes>'],
      tasks: 'coffee concat min stylus:stylesheets stylus:themes'
    }
  });

  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', 'coffee concat min stylus copy');

};
