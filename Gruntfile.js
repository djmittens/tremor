module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Make one huge java script file.
         * FIXME: Need to add support to usemin for special asset incantation of ghost.
         */
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    'dist/tremor/assets/app.js': [
                        'assets/js/*',
                        'assets/bower_components/jquery/jquery.js',
                        'assets/bower_components/bootstrap/dist/js/bootstrap.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/tremor/assets/app.js': ['dist/tremor/assets/app.js']
                }
            }
        },
        /**
         * Copy Over all of the important files to the distination directory.
         */
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['assets/images/*'], dest: 'dist/tremor/assets/images'},
                    {expand: true, src: ['assets/fonts/*'], dest: 'dist/tremor/assets/fonts'},
                    {expand: true, src: ['*.hbs', '*.md'], dest: 'dist/tremor/'}

                ]
            }
        },
        usemin: {
            options: {
                dest: 'dist/tremor'
            },
            html: ['dist/tremor/*.hbs']
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
                    { expand: true, flatten: true, src: ['dist/tremor/*.hbs'], dest: 'dist/tremor' }
                ]
            }
        },
        compress: {
            dist:  {
                options: {
                    archive: 'dist/tremor.zip'
                },
                files: [
                    {expand: true, src: ['**'], cwd: 'dist/tremor' }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-replace');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'usemin', 'replace', 'compress']);

    var insertBlocks = function (content, srcpath) {
        return content.replace('/');
    };

};