lucid.html.base.tags.progress = function(){
	lucid.html.tag.call(this);
	this.tag = 'progress';
	this.parameters = ['value', 'max'];
};
lucid.html.base.tags.progress.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.progress = lucid.html.base.tags.progress;
