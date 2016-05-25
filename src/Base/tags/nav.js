lucid.html.base.tags.nav = function(){
	lucid.html.tag.call(this);
	this.tag = 'nav';
};
lucid.html.base.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.nav = lucid.html.base.tags.nav;
