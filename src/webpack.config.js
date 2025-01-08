const PathModule = require('path');

module.exports = {
	mode: 'development',
	devtool: 'none',
	target: 'node',
	entry: './main.js',
	output: {
		filename: 'pckstudiomod_io.js',
		path: PathModule.resolve(__dirname, '..')
	}
}
