module.exports = function(grunt) {
	/* This is a feature in ECMAScript 5 that allows you to place a program, or 
	 * a function, in a 'strict' operating context. This strict context prevents certain 
	 * actions from being taken and throws more exceptions, in other words it prevents 
	 * you from writing bad Javascript. This is required by some Grunt plugins.
	*/
	'use strict';
	//
	//
	//
	//
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	//
	//
	//
	//
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
	//
	//
	//
	//
	// Define the configuration for all the tasks
	grunt.initConfig({
		//
		//
		//
		//
		// Project settings
		config: {
			// Configurable paths
			app: 'src',
			dist: 'build',
			bower: 'lib',
			temp: '.tmp',
			cdn: 'http://nxcache.nexon.net/FEED/mabinogi/landing/'
		},
		//
		//
		//
		//
		// Automatically inject Bower components into the HTML file
		bowerInstall: {
			dev: {
				src: [
					'<%= config.app %>/index.html'
				],
				dependencies: false,
				devDependencies: true,
				exclude: [/modernizr/],
				ignorePath: '<%= config.app %>'
			}
		},
		//
		//
		//
		//
		// Lint our HTML
		htmlhint: {
			dev: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': true,
					'spec-char-escape': true,
					'id-unique': true,
					'style-disabled': true,
					'img-alt-require': true,
					'doctype-html5': true
				},
				src: [
					'<%= config.app %>/index.html'
				]
			}
		},
		//
		//
		//
		//
		// Renames files for browser caching purposes
		rev: {
			build: {
				files: {
					src: [
						'<%= config.dist %>/js/**/*.js',
						'<%= config.dist %>/css/**/*.css',
						'<%= config.dist %>/img/**/*.{jpg,jpeg,gif,png}',
						'<%= config.dist %>/media/**/*.{jpg,jpeg,gif,png,mov,webm,mp3,mp4}'
					]
				}
			}
		},
		//
		//
		//
		//
		/* Reads HTML usemin blocks to enable smarts builds that automatically concat, 
		 * minify and revision files. Creates configurations in memory so additional tasks 
		 * can operate on them. 
		 */
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			html: [
				'<%= config.app %>/index.html'
			]
		},
		//
		//
		//
		//
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img', '<%= config.dist %>/css']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/{,*/}*.css']
		},
		//
		//
		//
		//
		// Minify HTML
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					// Set to true to enable the following options
					expand: true,
					cwd: '<%= config.dist %>/',
					src: '*.html',
					dest: '<%= config.dist %>/'
				}]
			}
		},
		//
		//
		//
		//
		// Minify JPEG, and GIF images (PNG excluded)
		imagemin: {
			options: {
				optimizationLevel: 7, // 0 to 7
				pngquant: true
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: ['{,*/}*.{jpg,gif}'],	// only optimize jpg and gif
					dest: '<%= config.dist %>/img'
				}]
			}
		},
		//
		//
		//
		//
		// Compile Sass to CSS and generate necessary files if requested
		compass: {
			dev:{
				options: {
					sassDir: '<%= config.app %>/sass',
					cssDir: '<%= config.app %>/css',
					imagesDir: '<%= config.app %>/img',
					javascriptDir: '<%= config.app %>/js',
					generatedImagesPath: '<%= config.app %>/img',
					generatedImagesDir: '<%= config.app %>/img/generated',
					httpGeneratedImagesPath: '../img',
					relativeAssets: false,
					assetCacheBuster: false
				}
			},
			build:{
				options: {
					sassDir: '<%= config.app %>/sass',
					cssDir: '<%= config.temp %>/css',
					imagesDir: '<%= config.app %>/img',
					javascriptDir: '<%= config.app %>/js',
					generatedImagesPath: '<%= config.temp %>/img',
					generatedImagesDir: '<%= config.dist %>/img/generated',
					//httpGeneratedImagesPath: '<%= config.cdn %>/img',
					httpGeneratedImagesPath: 'img',
					relativeAssets: false,
					assetCacheBuster: false
				}
			}
		},
		//
		//
		//
		//
		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dev: {
				//src: '<%= config.temp %>/css/**/*.css',
				//dest: '<%= config.temp %>/css/'
				expand: true,
				cwd: '<%= config.temp %>/css/',
				src: '**/*.css',
				dest: '<%= config.temp %>/css/'
			}
		},
		//
		//
		//
		//
		// Generate a custom Modernzr build that includes only the tests you reference
		modernizr: {
			build: {
				devFile: '<%= config.app %>/<%= config.bower %>/modernizr/modernizr.js',
				outputFile: '<%= config.dist %>/js/modernizr.js',
				uglify: true,
				files: {
					src: [
						'<%= config.dist %>/js/**/*.js',
						'<%= config.dist %>/css/**/*.css'
					]
				},
			}
		},
		//
		//
		//
		//
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js'
			]
		},
		//
		//
		//
		//
		// Run some tasks in parallel to speed up build process
		// *** REVISITE - Not working consistently across multiple PC environments ***
		concurrent: {
			build: [
				'compass:build',
				'copy:styles',
				'imagemin:build'
			]
		},
		//
		//
		//
		//
		// Watch for any changes
		watch: {
			options: {
				debounceDelay: 500,
				livereload: true
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['newer:jshint']
			},
			html: {
				files: 'src/**/*.html',
				tasks: ['newer:htmlhint']
			},
			styles: {
				files: 'src/sass/**/*.scss',
				tasks: 'default'
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['newer:jshint']
			}
		},
		//
		//
		//
		//
		// Condense CSS
		cssc: {
			build: {
				options: {
					consolidateViaSelectors : true
				},
				files: {
					'<%= config.dist %>/css/main.css': '<%= config.temp %>/css/main.css'
				}
			}
		},
		//
		//
		//
		//
		// Minify CSS
		cssmin: {
			build: {
				options: {
					report: 'gzip'
				},
				files: {
					'<%= config.dist %>/css/main.css': '<%= config.dist %>/css/main.css'
				}
			}
		},
		//
		//
		//
		//
		// Prep paths for cdn inside html and css files
		cdn: {
			options: {
				cdn: '<%= config.cdn %>',
				flatten: true
			},
			dist: {
				src: ['<%= config.dist %>/*.html', '<%= config.dist %>/**/*.css']
			}
		},
		//
		//
		//
		//
		// Copies remaining files to places other tasks can use
		copy: {
			dev: {
				// Set to true to enable the following options
				expand: true,
				dot: true,
				cwd: '<%= config.temp %>',
				dest: 'src/',
				src: [
					'**/*.html',
					'*.{ico, png, txt}',
					'.htaccess',
					'css/**/*.css',
					'img/**/**/*',
					'media/**/*'
				]
			},
			build: {
				// Set to true to enable the following options
				expand: true,
				dot: true,
				cwd: '<%= config.app %>',
				dest: '<%= config.dist %>',
				src: [
					'*.{ico,png,txt}',
					'.htaccess',
					'*.html',
					//'css/**/*.css',
					'img/**/**/*.*',
					'media/**/*'
				]
			},
			styles: {
				// Set to true to enable the following options
				expand: true,
				cwd: '<%= config.temp %>/css',
				dest: '.tmp/css',
				src: '**/*.css'
			}
		},
		//
		//
		//
		//
		// Empties folders to start fresh
		clean: {
			dev: {
				dot: true,
				src: ['<%= config.app %>/css/']
			},
			build: {
				dot: true,
				src: ['<%= config.temp %>/', '<%= config.dist %>/']
			}
		},
		//
		//
		//
		//
		// Grunt server settings
		connect: {
			options: {
				port: 9999,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost',
				open: true,
			},
			livereload: {
				options: {
					base: '<%= config.dist %>'
				}
			},
			build: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			},
			devserver: {
				options: {
					base: 'src'
				}
			}
		}
	});

	// Don't need to do this anymore because I'm using 'load-grunt'tasks'. See line 10.
	// Load the grunt plugins for the required tasks
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	//
	//
	//
	//
	// Register Grunt task(s)
	grunt.registerTask('default', [
		'clean:dev',					// clean the /src/css directory
		'compass:dev',					// compile sass/compass
		'autoprefixer',					// add vendor prefixed styles
		'htmlhint',						// validate html
		'newer:jshint',					// validate js
		'connect:devserver',			// open connection to dev site
		'watch'							// keep connection open and wathc for changes
	]);
	//
	//
	//
	//
	grunt.registerTask('build', [
		'clean:build',					// clean the build directory
		'useminPrepare',				// prepare usemin
		'concurrent:build',				// run concurrent tasks to shorten build time  (compile sass/compass, copy styles into /build, minify images)
		'autoprefixer',					// add vendor prefixed styles
		'concat',						// needed for usemin default concat
		'cssmin',						// needed for usemin default cssmin
		'uglify',						// needed for usemin to minify js
		'copy:build',					// copy assets from /src and /.tmp into build directory
		'modernizr',					// creates minimalistic version of modernizr based on js being used in files
		'rev:build',					// version all cdn assets
		'usemin',						// usemin
		'cdn',							// update relative and absolute paths to reference cdn
		'htmlmin',						// minify html
	]);
};