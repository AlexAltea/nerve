'use strict';

module.exports = function (grunt) {

    // Load tasks from grunt-* dependencies in package.json
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        copy: {
            app: {
                expand: true,
                filter: 'isFile',
                cwd: '<%= yeoman.app %>/',
                src: ['**/*.html', '**/*.jpg'],
                dest: '<%= yeoman.dist %>/'
            }
        },
        wiredep: {
            app: {
                src: ['<%= yeoman.dist %>/index.html']
            }
        },
        typescript: {
            base: {
                src: ['<%= yeoman.app %>/scripts/**/*.ts'],
                dest: '<%= yeoman.dist %>/nerve.js',
                options: {
                    target: 'es5'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= yeoman.dist %>/nerve.css': [
                        '<%= yeoman.app %>/styles/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.dist %>/'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35728,
                hostname: 'localhost',
                base: '<%= yeoman.dist %>'
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },
        watch: {
            scripts: {
                files: '<%= yeoman.app %>/scripts/{,*/}*.ts',
                tasks: ['typescript']
            },
            styles: {
                files: '<%= yeoman.app %>/styles/{,*/}*.css',
                tasks: ['cssmin']
            },
            views: {
                files: '<%= yeoman.app %>/{,*/}*.html',
                tasks: ['copy', 'wiredep', 'htmlmin']
            },
            livereload: {
                files: [
                    '<%= yeoman.dist %>/{,*/}*.html',
                    '<%= yeoman.dist %>/*.js',
                    '<%= yeoman.dist %>/*.css'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
        }
    });

    // Project tasks
    grunt.registerTask('test', [

    ]);
    grunt.registerTask('build', [
        'copy',
        'wiredep',
        'typescript',
        'cssmin',
        'htmlmin'
    ]);
    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('default', [
        'test',
        'build',
        'serve'
    ]);
};
