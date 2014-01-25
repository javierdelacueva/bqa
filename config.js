var bqa = bqa || {};

bqa.initialConfig = {
  parse: {
    'app_key' : 'MEhcOSyg1oJ96cTFA6l1YuB9GBrEsfV25pEVv97v',
    'js_key' : 'ercLZbrtW55Wpt6b8vLdYzRSfofon9YAREHZLAC9'
  },
  templates: {
    'example' : ['ExampleListItemView', 'ExampleView'],
    'bqa' : ['LoginView', 'HomeView', 'HelpView'],
    'layouts' : ['HeaderView']
  },
  routers: [
    'BqaRouter',
    'ExampleRouter'
  ]
};