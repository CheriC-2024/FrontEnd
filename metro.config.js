const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  defaultConfig.transformer = {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  defaultConfig.resolver = {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts
      .filter((ext) => ext !== 'svg')
      .concat('cjs'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  };

  return defaultConfig;
})();
