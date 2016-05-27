lucid.html.base.tags.hr = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.hr = lucid.html.base.tags.hr;
