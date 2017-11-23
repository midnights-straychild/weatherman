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
                './vue/dist/vue.js',
                './vue/dist/vue.min.js',
                './chart.js/dist/Chart.min.js'
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
    }
  });

  grunt.task.registerTask('dist', ['copy']);

  grunt.task.registerTask('default', ['dist']);
  
  grunt.loadNpmTasks('grunt-contrib-copy');
}