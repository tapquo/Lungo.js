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

        javascripts: ['src/**/*.js'],
        stylesheets: [
            'src/**/lungo.base.styl',
            'src/**/lungo.layout.styl',
            'src/**/lungo.layout.*.styl',
            'src/**/lungo.widgets.styl',
            'src/**/lungo.widgets.*.styl'],
        icons: ['src/**/lungo.icon**.styl'],
        themes: ['src/**/theme**.styl']
    },

    stylus: {
      stylesheets: {
        options: { compress: true, paths: ['src/stylesheets/import'] },
        files: { 'packages/<%=meta.file%>/<%=meta.file%>.css': '<config:resources.stylesheets>' }
      },
      icons: {
        options: { compress: true },
        files: { 'packages/lungo/**.css': '<config:resources.icons>' }
      },
      flatten: {
        options: { flatten: true },
        files: { 'packages/lungo/**.css': '<config:resources.themes>' }
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
        dest: 'packages/<%=meta.file%>/<%=meta.file%>.js'
      }
    },

    copy: {
    example: {
        files: { 'example/components/lungo/': ['packages/lungo/*'] }
      },
      target: {
        files: { 'packages/lungo.theme/': ['<config:resources.themes>'] }
      },

      imports: {
        files: { 'packages/lungo.theme/import/': ['src/**/vendor.styl'] }
      }
    },

    watch: {
      files: ['<config:resources.javascripts>', '<config:resources.stylesheets>', '<config:resources.themes>'],
      tasks: 'concat min stylus copy'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', 'concat min stylus copy');

};
