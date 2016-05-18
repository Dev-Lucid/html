lucid.html.builder.tags.mark = function(){
	lucid.html.tag.call(this);
	this.tag = 'mark';
};
lucid.html.builder.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.mark.prototype.constructor = lucid.html.builder.tags.mark;
