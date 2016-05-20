lucid.html.base.tags.mark = function(){
	lucid.html.tag.call(this);
	this.tag = 'mark';
};
lucid.html.base.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.mark = lucid.html.base.tags.mark;
