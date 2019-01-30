module.exports = Object.freeze({
  appName: "National Drought Map",
  navItems: [
    {title: 'About', url: '/about.html'},
    {title: 'Help', url: '/help.html'},
    {title: 'FAQ', url: '/faq.html'},
    {title: 'Privacy', url: '/privacy.html'},
    {title: 'Launch National Drought Map', url: 'https://map.drought.gov.au'}
  ],
  markdown:  process.cwd() + "/markdown",
  dist: process.cwd() + "/dist",
  template: process.cwd() + "/template",
  footerCredit: "CSIRO Data61 2014-2017. All Rights Reserved"
});
