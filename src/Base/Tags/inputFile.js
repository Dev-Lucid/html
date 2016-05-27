lucid.html.base.tags.inputFile = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.parameters = ['name'];
	this.attributes['type'] = 'file';
};
lucid.html.base.tags.inputFile.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputFile = lucid.html.base.tags.inputFile;
