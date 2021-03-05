const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = function override(config, _env) {
	config.plugins = config.plugins.map((plugin) => {
		if (plugin.constructor.name === "GenerateSW") {
			return new WorkboxWebpackPlugin.InjectManifest({
				swSrc: "./src/service-worker.ts",
				swDest: "service-worker.ts"
			});
		}
		return plugin;
	});
	return config;
};
