module.exports = function(grunt)
{
	var config = require('./grunt_tasks/config');
	var open = require('./grunt_tasks/open');
	var connect = require('./grunt_tasks/connect');
	var copy = require('./grunt_tasks/copy');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: config,
		open: open,
		connect: connect,
		copy: copy
	});

	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', [
		'copy:copySite1',
		'open:openSite1',
		'connect:connectSite1',
	]);
};