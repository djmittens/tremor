module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        clean: ['dist'],
        cssmin: {
            dist: {
                files: {
                    'dist/assets/css/app.min.css': [
                        'assets/css/*.css',
                        'assets/bower_components/bootstrap/dist/css/*.min.css'
                    ]
                }
            }
        },

        /**
         * DAAANg bitch u is ugly.
         * FIXME: Usemin is actually supposed to do this part for us, so fix it dammit!!!
         */
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/assets/js/app.min.js': [
                        'assets/js/*',
                        'assets/bower_components/jquery/dist/jquery.js',
                        'assets/bower_components/bootstrap/dist/js/bootstrap.js'
                    ]
                }
            }
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

        //FIXME: Ugly ass fix for usemin not being able to tolerate spaces.
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /!asset-/,
                            replacement: 'asset '
                        }
                    ],
                    prefix: ''
                },
                files: [
                    { expand: true, flatten: true, src: ['dist/*.hbs'], dest: 'dist' }
                ]
            }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-replace');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'copy', 'usemin', 'replace', 'compress']);
};