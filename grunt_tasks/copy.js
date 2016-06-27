module.exports = copy = {
	copySite1: {
		files:[
			{src: '<%= config.app %>/index.html', dest: '<%= config.build %>/index.html'},
			{src: '<%= config.app %>/js/main.js', dest: '<%= config.build %>/js/main.js'},
			
			// jquery
			{src: './bower_components/jquery/dist/jquery.js', dest: '<%= config.build %>/js/jquery.js'},

			// bootstrap
			{src: './bower_components/bootstrap/dist/js/bootstrap.js', dest: '<%= config.build %>/js/bootstrap.js'},
			{src: './bower_components/bootstrap/dist/css/bootstrap.css', dest: '<%= config.build %>/styles/bootstrap.css'},
			{expand: true, cwd: './bower_components/bootstrap/dist/fonts/', src: '**', dest: '<%= config.test %>/styles/fonts/'}
		]
	}
};