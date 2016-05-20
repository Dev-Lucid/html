lucid.html.base.tags.legend = function(){
	lucid.html.tag.call(this);
	this.tag = 'legend';
};
lucid.html.base.tags.legend.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.legend = lucid.html.base.tags.legend;
