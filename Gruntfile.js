const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
        js: {
            expand: true,
            cwd: './node_modules',
            dest: './static/js/libs/',
            flatten: true,
            filter: 'isFile',
            src: [
                './jquery/dist/jquery.min.js',
                './jquery/dist/jquery.min.map',
                './popper.js/dist/popper.min.js',
                './popper.js/dist/popper.min.js.map',
                './bootstrap/dist/js/bootstrap.min.js',
                './flot/jquery.flot.js',
                './flot/jquery.flot.time.js'
            ]
        },
        css: {
            expand: true,
            cwd: './node_modules',
            dest: './static/css/libs/',
            flatten: true,
            filter: 'isFile',
            src: [
                './bootstrap/dist/css/bootstrap.min.css',
                './bootstrap/dist/css/bootstrap-theme.min.css',
                './bootstrap/dist/css/bootstrap.min.css.map',
                './bootstrap/dist/css/bootstrap-theme.min.css.map'
            ]
        },
        fonts: {
            expand: true,
            cwd: './node_modules',
            dest: './static/fonts/',
            flatten: true,
            filter: 'isFile',
            src: [
                './bootstrap/dist/fonts/*'
            ]
        }
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    }
  });

  grunt.task.registerTask('dist', ['copy', 'webpack:dev']);

  grunt.task.registerTask('default', ['dist']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');
}