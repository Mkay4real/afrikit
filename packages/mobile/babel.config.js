/* eslint-disable */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'react' }], 'nativewind/babel'],
    plugins: [
      'react-native-reanimated/plugin', // Must be listed last
    ],
  }
}
