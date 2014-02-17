module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        clean: ['dist'],
        useminPrepare: {
            html: '*.hbs'
        },

        /**
         * Copy Over all of the important files to the distination directory.
         */
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['assets/images/*'], dest: 'dist/'},
                    {expand: true, src: ['assets/fonts/*'], dest: 'dist/'},
                    {expand: true, src: ['*'], cwd:'assets/bower_components/bootstrap/fonts/', dest: 'dist/assets/fonts'},
                    {expand: true, src: ['*.hbs', '*.md'], dest: 'dist/'}

                ]
            }
        },
        usemin: {
            options: {
                dest: 'dist/'
            },
            html: ['dist/*.hbs']
        },

        compress: {
            dist:  {
                options: {
                    archive: 'dist/tremor.v.<%= bower.version %>.zip'
                },
                files: [
                    {expand: true, src: ['**'], cwd: 'dist/' }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-replace');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'copy', 'usemin', 'compress']);
};