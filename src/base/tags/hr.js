lucid.html.base.tags.hr = function(){
	lucid.html.tag.call(this);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.hr.prototype.constructor = lucid.html.base.tags.hr;
lucid.html.builder.tags.hr = lucid.html.base.tags.hr;
