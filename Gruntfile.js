module.exports = function ( grunt ) {

    /**
     * Config.
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            notify_title: 'Exentriq Static UI',
            eq_st_ui_default_prefix: 'static-ui-',
            eq_default_sass_dir: 'sass',
            eq_default_css_dir: 'assets/css'
        },

        // CSS Sass
        sass: {
            // UI -> Login
            eq_st_ui_login: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    'ui/login/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>login.css': '<%= meta.eq_default_sass_dir %>/<%= meta.eq_st_ui_default_prefix %>login.scss'
                }
            },
            // UI -> Public Profile
            eq_st_ui_public_profile: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    'ui/public_profile/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>public-profile.css': '<%= meta.eq_default_sass_dir %>/<%= meta.eq_st_ui_default_prefix %>public-profile.scss'
                }
            }
        },

        // CSS autoprefixer
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    })
                ]
            },
            // UI -> Login
            eq_st_ui_login: {
                src: 'ui/login/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>login.css',
                dest: 'ui/login/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>login.css'
            },
            // UI -> Public Profile
            eq_st_ui_public_profile: {
                src: 'ui/public_profile/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>public-profile.css',
                dest: 'ui/public_profile/<%= meta.eq_default_css_dir %>/<%= meta.eq_st_ui_default_prefix %>public-profile.css'
            }
        },

        // JS jshint
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                undef: false,
                browser: true,
                globals: {
                    jQuery: true
                },
                reporter: require('jshint-stylish')
                //ignores: ['src/app/common/providers/rollbar.js']
            },
            // UI
            eq_st_ui: [
                'ui/**/*.js'
            ]
        },

        // Watch
        watch: {
            // Common
            eq_st_ui_jshint: {
                files: ['ui/**/*.js'],
                tasks: [
                    '_eq_st_ui_jshint'
                ]
            },
            // UI -> Login
            eq_st_ui_login_sass: {
                files: ['<%= meta.eq_default_sass_dir %>/**/*.scss'],
                tasks: [
                    '_eq_st_ui_login_compile'
                ]
            },
            // UI -> Public Profile
            eq_st_ui_public_profile_sass: {
                files: ['<%= meta.eq_default_sass_dir %>/**/*.scss'],
                tasks: [
                    '_eq_st_ui_public_profile_compile'
                ]
            }
        },

        // Concurrent
        concurrent: {
            // UI -> Login
            eq_st_ui_login: {
                tasks: ['watch:eq_st_ui_jshint', 'watch:eq_st_ui_login_sass'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            },
            // UI -> Public Profile
            eq_st_ui_public_profile: {
                tasks: ['watch:eq_st_ui_jshint', 'watch:eq_st_ui_public_profile_sass'],
                options: {
                    logConcurrentOutput: true,
                    limit: 10
                }
            }
        },

        // System Notifications
        notify: {
            sass_compile: {
                options: {
                    enabled: true,
                    message: 'Sass Compiled!',
                    title: "<%= meta.notify_title %>",
                    success: true,
                    duration: 1
                }
            }
        }

    });

    /**
     * Load required Grunt tasks.
     */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sass');

    /**
     * Register Grunt tasks.
     */
    grunt.registerTask('default', ['concurrent:eq_st_ui_login']);

    // -------------------------------------------------------------------------------
    // UI -> Common
    // -------------------------------------------------------------------------------

    grunt.registerTask('_eq_st_ui_jshint', ['jshint:eq_st_ui']);

    // -------------------------------------------------------------------------------
    // UI -> Login
    // -------------------------------------------------------------------------------

    // Watch
    grunt.registerTask('watch_eq_st_ui_login', ['concurrent:eq_st_ui_login']);

    // Sass Compile
    grunt.registerTask('_eq_st_ui_login_compile', ['sass:eq_st_ui_login', 'postcss:eq_st_ui_login']);

    // Sass alias with notify, for local compile
    grunt.registerTask('eq_st_ui_login_compile', ['_eq_st_ui_login_compile', 'notify:sass_compile']);

    // Build
    grunt.registerTask('build_eq_st_ui_login', [
        '_eq_st_ui_jshint',
        '_eq_st_ui_login_compile',
        'notify:sass_compile'
    ]);

    // -------------------------------------------------------------------------------


    // -------------------------------------------------------------------------------
    // UI -> Public Profile
    // -------------------------------------------------------------------------------

    // Watch
    grunt.registerTask('watch_eq_st_ui_public_profile', ['concurrent:eq_st_ui_public_profile']);

    // Sass Compile
    grunt.registerTask('_eq_st_ui_public_profile_compile', ['sass:eq_st_ui_public_profile', 'postcss:eq_st_ui_public_profile']);

    // Sass alias with notify, for local compile
    grunt.registerTask('eq_st_ui_public_profile_compile', ['_eq_st_ui_public_profile_compile', 'notify:sass_compile']);

    // Build
    grunt.registerTask('build_eq_st_ui_public_profile', [
        '_eq_st_ui_jshint',
        '_eq_st_ui_public_profile_compile',
        'notify:sass_compile'
    ]);

    // -------------------------------------------------------------------------------



};
