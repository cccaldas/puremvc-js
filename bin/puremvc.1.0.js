function Controller(a){if(Controller.instanceMap[a]!=null){throw new Error(Controller.MULTITON_MSG)}this.multitonKey=a;Controller.instanceMap[this.multitonKey]=this;this.commandMap=new Array();this.initializeController()}Controller.prototype.initializeController=function(){this.view=View.getInstance(this.multitonKey)};Controller.getInstance=function(a){if(null==this.instanceMap[a]){this.instanceMap[a]=new this(a)}return this.instanceMap[a]};Controller.prototype.executeCommand=function(a){var c=this.commandMap[a.getName()];if(c==null){return}var b=new c();b.initializeNotifier(this.multitonKey);b.execute(a)};Controller.prototype.registerCommand=function(a,b){if(this.commandMap[a]==null){this.view.registerObserver(a,new Observer(this.executeCommand,this))}this.commandMap[a]=b};Controller.prototype.hasCommand=function(a){return this.commandMap[a]!=null};Controller.prototype.removeCommand=function(a){if(this.hasCommand(a)){this.view.removeObserver(a,this);this.commandMap[a]=null}};Controller.removeController=function(a){delete this.instanceMap[a]};Controller.prototype.view=null;Controller.prototype.commandMap=null;Controller.prototype.multitonKey=null;Controller.instanceMap=[];Controller.MULTITON_MSG="controller key for this Multiton key already constructed";function Model(a){if(Model.instanceMap[a]){throw new Error(Model.MULTITON_MSG)}this.multitonKey=a;Model.instanceMap[a]=this;this.proxyMap=[];this.initializeModel()}Model.prototype.initializeModel=function(){};Model.getInstance=function(a){if(Model.instanceMap[a]==null){Model.instanceMap[a]=new Model(a)}return Model.instanceMap[a]};Model.prototype.registerProxy=function(a){a.initializeNotifier(this.multitonKey);this.proxyMap[a.getProxyName()]=a;a.onRegister()};Model.prototype.retrieveProxy=function(a){return this.proxyMap[a]};Model.prototype.hasProxy=function(a){return this.proxyMap[a]!=null};Model.prototype.removeProxy=function(b){var a=this.proxyMap[b];if(a){this.proxyMap[b]=null;a.onRemove()}return a};Model.removeModel=function(a){delete Model.instanceMap[a]};Model.prototype.proxyMap=null;Model.instanceMap=[];Model.prototype.multitonKey;Model.MULTITON_MSG="Model instance for this Multiton key already constructed!";function View(a){if(View.instanceMap[a]!=null){throw new Error(View.MULTITON_MSG)}this.multitonKey=a;View.instanceMap[this.multitonKey]=this;this.mediatorMap=[];this.observerMap=[];this.initializeView()}View.prototype.initializeView=function(){return};View.getInstance=function(a){if(View.instanceMap[a]==null){View.instanceMap[a]=new View(a)}return View.instanceMap[a]};View.prototype.registerObserver=function(b,a){if(this.observerMap[b]!=null){this.observerMap[b].push(a)}else{this.observerMap[b]=[a]}};View.prototype.notifyObservers=function(c){if(this.observerMap[c.getName()]!=null){var e=this.observerMap[c.getName()],d=[],a;for(var b=0;b<e.length;b++){a=e[b];d.push(a)}for(var b=0;b<d.length;b++){a=d[b];a.notifyObserver(c)}}};View.prototype.removeObserver=function(c,b){var d=this.observerMap[c];for(var a=0;a<d.length;a++){if(d[a].compareNotifyContext(b)==true){d.splice(a,1);break}}if(d.length==0){delete this.observerMap[c]}};View.prototype.registerMediator=function(c){if(this.mediatorMap[c.getMediatorName()]!=null){return}c.initializeNotifier(this.multitonKey);this.mediatorMap[c.getMediatorName()]=c;var d=c.listNotificationInterests();if(d.length>0){var a=new Observer(c.handleNotification,c);for(var b=0;b<d.length;b++){this.registerObserver(d[b],a)}}c.onRegister()};View.prototype.retrieveMediator=function(a){return this.mediatorMap[a]};View.prototype.removeMediator=function(a){var c=this.mediatorMap[a];if(c){var d=c.listNotificationInterests();for(var b=0;b<d.length;b++){this.removeObserver(d[b],c)}delete this.mediatorMap[a];c.onRemove()}return c};View.prototype.hasMediator=function(a){return this.mediatorMap[a]!=null};View.removeView=function(a){delete View.instanceMap[a]};View.prototype.mediatorMap=null;View.prototype.observerMap=null;View.instanceMap=[];View.prototype.multitonKey=null;View.MULTITON_MSG="View instance for this Multiton key already constructed!";var OopHelp={global:(function(){return this})(),declare:function(e,f,k){var b=e.split("."),d=k||OopHelp.global,a,j,h;for(var g=0,c=b.length;g<c;g++){a=d;h=b[g];d=(null==d[h]?d[h]={}:d[h])}if(null==f){return d}return a[h]=f},extend:function(c,a){if("function"!==typeof c){throw new TypeError("#extend- child should be Function")}if("function"!==typeof a){throw new TypeError("#extend- parent should be Function")}if(a===c){return}var b=new Function;b.prototype=a.prototype;c.prototype=new b;return c.prototype.constructor=c},decorate:function(b,c){for(var a in c){b[a]=c[a]}return b}};function define(h,i,c){if(!h){h={}}var f=h.name,a=h.parent,b="function"===typeof a,e,d=h.scope||null,g;if("parent" in h&&!b){throw new TypeError("Class parent must be Function")}if(h.hasOwnProperty("constructor")){e=h.constructor;if("function"!==typeof e){throw new TypeError("Class constructor must be Function")}}else{if(b){e=function(){a.apply(this,arguments)}}else{e=new Function}}if(b){OopHelp.extend(e,a)}if(i){g=e.prototype;OopHelp.decorate(g,i);g.constructor=e}if(c){OopHelp.decorate(e,c)}if(f){if("string"!==typeof f){throw new TypeError("Class name must be primitive string")}OopHelp.declare(f,e,d)}return e}function MacroCommand(){this.subCommands=[];this.initializeMacroCommand()}MacroCommand.prototype=new Notifier;MacroCommand.prototype.constructor=MacroCommand;MacroCommand.prototype.subCommands=null;MacroCommand.prototype.initializeMacroCommand=function(){};MacroCommand.prototype.addSubCommand=function(a){this.subCommands.push(a)};MacroCommand.prototype.execute=function(a){while(this.subCommands.length>0){var b=this.subCommands.shift();var c=new b;c.initializeNotifier(this.multitonKey);c.execute(a)}};function SimpleCommand(){}SimpleCommand.prototype=new Notifier;SimpleCommand.prototype.constructor=SimpleCommand;SimpleCommand.prototype.execute=function(a){};function Facade(a){if(Facade.instanceMap[a]!=null){throw new Error(Facade.MULTITON_MSG)}this.initializeNotifier(a);Facade.instanceMap[a]=this;this.initializeFacade()}Facade.prototype.initializeFacade=function(){this.initializeModel();this.initializeController();this.initializeView()};Facade.getInstance=function(a){if(Facade.instanceMap[a]==null){Facade.instanceMap[a]=new Facade(a)}return Facade.instanceMap[a]};Facade.prototype.initializeController=function(){if(this.controller!=null){return}this.controller=Controller.getInstance(this.multitonKey)};Facade.prototype.initializeModel=function(){if(this.model!=null){return}this.model=Model.getInstance(this.multitonKey)};Facade.prototype.initializeView=function(){if(this.view!=null){return}this.view=View.getInstance(this.multitonKey)};Facade.prototype.registerCommand=function(a,b){this.controller.registerCommand(a,b)};Facade.prototype.removeCommand=function(a){this.controller.removeCommand(a)};Facade.prototype.hasCommand=function(a){return this.controller.hasCommand(a)};Facade.prototype.registerProxy=function(a){this.model.registerProxy(a)};Facade.prototype.retrieveProxy=function(a){return this.model.retrieveProxy(a)};Facade.prototype.removeProxy=function(b){var a=null;if(this.model!=null){a=this.model.removeProxy(b)}return a};Facade.prototype.hasProxy=function(a){return this.model.hasProxy(a)};Facade.prototype.registerMediator=function(a){if(this.view!=null){this.view.registerMediator(a)}};Facade.prototype.retrieveMediator=function(a){return this.view.retrieveMediator(a)};Facade.prototype.removeMediator=function(a){var b=null;if(this.view!=null){b=this.view.removeMediator(a)}return b};Facade.prototype.hasMediator=function(a){return this.view.hasMediator(a)};Facade.prototype.sendNotification=function(c,a,b){this.notifyObservers(new Notification(c,a,b))};Facade.prototype.notifyObservers=function(a){if(this.view!=null){this.view.notifyObservers(a)}};Facade.prototype.initializeNotifier=function(a){this.multitonKey=a};Facade.hasCore=function(a){return Facade.instanceMap[a]!=null};Facade.removeCore=function(a){if(Facade.instanceMap[a]==null){return}Model.removeModel(a);View.removeView(a);Controller.removeController(a);delete Facade.instanceMap[a]};Facade.prototype.controller=null;Facade.prototype.model=null;Facade.prototype.view=null;Facade.prototype.multitonKey=null;Facade.instanceMap=[];Facade.MULTITON_MSG="Facade instance for this Multiton key already constructed!";function Mediator(a,b){this.mediatorName=a||this.constructor.NAME;this.viewComponent=b}Mediator.NAME="Mediator";Mediator.prototype=new Notifier;Mediator.prototype.constructor=Mediator;Mediator.prototype.getMediatorName=function(){return this.mediatorName};Mediator.prototype.setViewComponent=function(a){this.viewComponent=a};Mediator.prototype.getViewComponent=function(){return this.viewComponent};Mediator.prototype.listNotificationInterests=function(){return[]};Mediator.prototype.handleNotification=function(a){return};Mediator.prototype.onRegister=function(){return};Mediator.prototype.onRemove=function(){return};Mediator.prototype.mediatorName=null;Mediator.prototype.viewComponent=null;function Notification(b,a,c){this.name=b;this.body=a;this.type=c}Notification.prototype.getName=function(){return this.name};Notification.prototype.setBody=function(a){this.body=a};Notification.prototype.getBody=function(){return this.body};Notification.prototype.setType=function(a){this.type=a};Notification.prototype.getType=function(){return this.type};Notification.prototype.toString=function(){var a="Notification Name: "+this.getName();a+="\nBody:"+((this.body==null)?"null":this.body.toString());a+="\nType:"+((this.type==null)?"null":this.type);return a};Notification.prototype.name=null;Notification.prototype.type=null;Notification.prototype.body=null;function Notifier(){}Notifier.prototype.sendNotification=function(d,a,c){var b=this.getFacade();if(b){b.sendNotification(d,a,c)}};Notifier.prototype.facade;Notifier.prototype.initializeNotifier=function(a){this.multitonKey=String(a);this.facade=this.getFacade()};Notifier.prototype.getFacade=function(){if(this.multitonKey==null){throw new Error(Notifier.MULTITON_MSG)}return Facade.getInstance(this.multitonKey)};Notifier.prototype.multitonKey=null;Notifier.MULTITON_MSG="multitonKey for this Notifier not yet initialized!";function Observer(a,b){this.setNotifyMethod(a);this.setNotifyContext(b)}Observer.prototype.setNotifyMethod=function(a){this.notify=a};Observer.prototype.setNotifyContext=function(a){this.context=a};Observer.prototype.getNotifyMethod=function(){return this.notify};Observer.prototype.getNotifyContext=function(){return this.context};Observer.prototype.notifyObserver=function(a){this.getNotifyMethod().call(this.getNotifyContext(),a)};Observer.prototype.compareNotifyContext=function(a){return a===this.context};Observer.prototype.notify=null;Observer.prototype.context=null;function Proxy(b,a){this.proxyName=b||this.constructor.NAME;if(a!=null){this.setData(a)}}Proxy.NAME="Proxy";Proxy.prototype=new Notifier;Proxy.prototype.constructor=Proxy;Proxy.prototype.getProxyName=function(){return this.proxyName};Proxy.prototype.setData=function(a){this.data=a};Proxy.prototype.getData=function(){return this.data};Proxy.prototype.onRegister=function(){return};Proxy.prototype.onRemove=function(){return};Proxy.prototype.proxyName=null;Proxy.prototype.data=null;