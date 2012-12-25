module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:packages/lungo/component.json>',

    meta: {
        file: "lungo",
        banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
                '   <%= pkg.homepage %>\n' +
                '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */'
    },

    resources: {
        core: ['src/Lungo.js'],
        modules: [
          'src/modules/*.js',
          'src/boot/*.js',
          'src/data/*.js',
          'src/element/*.js',
          'src/router/Lungo.Router.js', 'src/router/Lungo.Router.History.js',
          'src/view/*.js'],
        device: ['src/device/*.js'],

        javascripts: ['src/**/*.js'],
        stylesheets: ['src/**/*.styl']
    },

    stylus: {
      compile: {
        options: { compress: true, paths: ['src/stylesheets/import'] },
        files: {
          'packages/<%=meta.file%>/<%=meta.file%>.css': ['src/**/Lungo.*.styl']
        }
      },
      flatten: {
        options: { flatten: true },
        files: {
          'packages/lungo/**.css': ['src/**/theme**.styl']
        }
      }
    },

    concat: {
      js: {
        src: ['<banner>', '<config:resources.core>', '<config:resources.modules>'],
        dest: 'build/<%=meta.file%>.js'
      },
      device: {
        src: ['<banner>', '<config:resources.device>'],
        dest: 'build/<%=meta.file%>.device.js'
      }
    },

    min: {
      js: {
        src: ['<banner>', 'build/<%=meta.file%>.js'],
        dest: 'packages/<%=meta.file%>/<%=meta.file%>.js'
      }
    },

    watch: {
      files: ['<config:resources.javascripts>', '<config:resources.stylesheets>'],
      tasks: 'concat min stylus'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task.
  grunt.registerTask('default', 'concat min stylus');

};
