lucid.html.base.tags.code = function(){
	lucid.html.tag.call(this);
	this.tag = 'code';
};
lucid.html.base.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.code = lucid.html.base.tags.code;
