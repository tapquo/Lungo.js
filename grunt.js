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
          'build/src/modules/*.js',
          'build/src/boot/*.js',
          'build/src/data/*.js',
          'build/src/element/*.js',
          'build/src/router/Lungo.Router.js', 'build/src/router/Lungo.Router.*.js'],
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
        files: { '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/**.css': '<config:resources.icons>' }
      },
      flatten: {
        options: { flatten: true },
        files: { '<%=meta.endpoint%>/<%=meta.file%><%=meta.version%>/**.css': '<config:resources.themes>' }
      }
    },

    copy: {
      example: {
        files: { 'example/components/<%=meta.file%>/': ['<%=meta.endpoint%>/<%=meta.file%>/*'] }
      },
      target: {
        files: { '<%=meta.endpoint%>/<%=meta.file%>.theme/': ['<config:resources.themes>'] }
      }
    },

    watch: {
      files: ['<config:resources.coffeescripts>', '<config:resources.stylesheets>', '<config:resources.themes>'],
      tasks: 'coffee concat min stylus'
    }
  });

  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', 'coffee concat min stylus copy');

};
