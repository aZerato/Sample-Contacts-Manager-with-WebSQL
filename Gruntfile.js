module.exports = function(grunt){
	var port = grunt.option('port') || 8080;
	var url = grunt.option('url') || "http://localhost:"+port;

	// Grunt configuration
	grunt.initConfig({
		open: {
			all: {
				// Gets the port from the connect information
				path: url
			}
		},
		connect: {
			server: {
				options: {
					base :'dist/',
					port: port,
					keepalive: true
				}
			}
		},
		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'dist/',
				flow: {
					html: {
						steps: {
							js: ['concat','uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},
		usemin: {
			html: ['dist/*.html'],
			options: {
				assetsDirs: ['dist']
			}
		},
		copy: {
			dist:{
				files: [{
					expand: true,
				    cwd: 'app/',
				    src: 'index.html',
				    dest: 'dist/',
				    flatten: true,
				    filter: 'isFile',
				}]
			},
			fonts:{
				expand: true,
				flatten: true,
				dest: 'dist/fonts/',
				src: ['bower_components/bootstrap/fonts/**'],
				filter: 'isFile'
			}
		},
		clean: {
			dist: {
				src: ['dist/']
			},
			tmp: {
				src:['.tmp']
			}
		},
		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			dist: {
				src: 'dist/{js,css}/**'
			}
		}
	});

	// Dev tasks 
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-filerev');


	// Tasks definition
	grunt.registerTask('default', ['open','connect:server']);
	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concat',
		'copy',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'clean:tmp'
	]);

}
