module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    meta: {
        file: "lungo",
        name: 'JavaScript Hooker',
        banner: '/*! <%= meta.name %> - <%= grunt.template.today("m/d/yyyy") %> */'
    },

    resources: {
        coffee: ['src/**/*.coffee'],
        stylus: ['stylesheets/**/*.styl'],

        js: ['build/src/**/*.js'],
        css: ['src/**/*.coffee']
    },


    coffee: {
      app: {
        src: ['<config:resources.coffee>'],
        dest: 'build',
        options: {
            bare: true,
            preserve_dirs: true
            // base_path: 'javascript'
        }
      }
    },

    stylus: {
      compile: {
        options: {
          compress: true
          // paths: ['path/to/import', 'another/to/import']
        },
        files: {
          'dist/<%=meta.file%>.css': ['stylesheets/**/*.styl']
        }
      },
      flatten: {
        options: {
          flatten: true
        },
        files: {
          'build/css/theme.default.css': ['stylesheets/**/*.styl']
        }
      }
    },

    concat: {
      js: {
        src: ['<banner>', '<config:resources.js>'],
        dest: 'dist/<%=meta.file%>.js'
      }
    },


    min: {
      js: {
        src: ['<banner>', 'dist/<%=meta.file%>.js'],
        dest: 'dist/<%=meta.file%>.min.js'
      }
    },


    watch: {
      files: ['<config:resources.coffee>', '<config:resources.stylus>'],
      tasks: 'coffee concat'
    },


    uglify: {}
  });

  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task.
  grunt.registerTask('default', 'coffee stylus concat min');

};
