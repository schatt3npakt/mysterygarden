const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "", // Use this if files are not hosted at server root, for example itchio
  pwa: {
    name: "Mystery Gardem",
  },
});
