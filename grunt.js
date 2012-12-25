module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:packages/lungo/component.json>',

    meta: {
        file: "lungo",
        banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
                '   <%= pkg.homepage %>\n' +
                '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
                ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */'
    },

    resources: {
        stylesheets: ['src/**/*.styl']
    },

    stylus: {
      compile: {
        options: { compress: true, paths: ['src/stylesheets/import'] },
        files: {
          'packages/lungo/<%=meta.file%>.css': ['src/**/Lungo.*.styl']
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
        src: ['<config:resources.js>'],
        dest: 'package/<%=meta.file%>.js'
      }
    },

    min: {
      js: {
        src: ['<banner>', 'package/<%=meta.file%>.js'],
        dest: 'package/<%=meta.file%>.min.js'
      }
    },

    watch: {
      files: ['<config:resources.stylesheets>'],
      tasks: 'stylus'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task.
  grunt.registerTask('default', 'stylus');

};
