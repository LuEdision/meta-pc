module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 1%,last 2 versions,not ie <= 8',
        useBuiltIns: 'entry',
        corejs: '3',
      },
    ],
  ],
};
