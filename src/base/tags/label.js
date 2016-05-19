lucid.html.builder.tags.label = function(){
	lucid.html.tag.call(this);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.builder.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.label.prototype.constructor = lucid.html.builder.tags.label;
