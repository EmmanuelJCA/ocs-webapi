module.exports = {
  lang: 'en-US',
  title: 'Oncology Control System Documentation 🎉',
  description: 'Api to manage oncology patients',
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/ocs-webapi/' : '/',
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/development',
      '/docs/architecture',
      '/docs/naming-cheatsheet',
      '/docs/linting',
    ],
  },
};
