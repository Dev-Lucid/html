lucid.html.builder.tags.hr = function(){
	lucid.html.tag.call(this);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.hr.prototype.constructor = lucid.html.builder.tags.hr;
