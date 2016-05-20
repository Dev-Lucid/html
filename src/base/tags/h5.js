lucid.html.base.tags.h5 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h5';
};
lucid.html.base.tags.h5.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h5 = lucid.html.base.tags.h5;
