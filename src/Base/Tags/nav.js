lucid.html.base.tags.nav = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'nav';
};
lucid.html.base.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.nav = lucid.html.base.tags.nav;
