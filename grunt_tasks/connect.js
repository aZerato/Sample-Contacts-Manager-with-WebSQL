module.exports = connect = {
	connectSite1: {
		options: {
			port: '<%= config.port %>',
			base: '<%= config.build %>',
			keepalive: true,
		}
	}
};