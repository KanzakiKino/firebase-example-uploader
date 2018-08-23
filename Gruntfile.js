module.exports = function ( grunt ) {
    grunt.initConfig( {
        dirs: {
            source : "src",
            release: "release"
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "<%= dirs.release %>/index.html":"<%= dirs.source %>/index.html"
                }
            }
        },

        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    "<%= dirs.release %>/main.css":"<%= dirs.source %>/main.scss"
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    "<%= dirs.release %>/uploader.js": [
                        "<%= dirs.source %>/uploader.js/*.js"
                    ]
                }
            }
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-htmlmin" );
    grunt.loadNpmTasks( "grunt-contrib-sass" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );

    grunt.registerTask( "all"    , ["htmlmin","sass","uglify"] );
    grunt.registerTask( "default", ["all"] );
};
