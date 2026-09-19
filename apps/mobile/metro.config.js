// Learn more: https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/#web-setup
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite web build imports wa-sqlite.wasm as an asset.
config.resolver.assetExts.push('wasm');

// SharedArrayBuffer (used by the SQLite web worker) needs cross-origin isolation.
config.server.enhanceMiddleware = (middleware) => (req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  middleware(req, res, next);
};

module.exports = config;
