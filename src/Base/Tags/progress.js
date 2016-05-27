lucid.html.base.tags.progress = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'progress';
	this.parameters = ['value', 'max'];
};
lucid.html.base.tags.progress.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.progress = lucid.html.base.tags.progress;
