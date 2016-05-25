lucid.html.base.tags.inputFile = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.parameters = ['name'];
	this.attributes['type'] = 'file';
};
lucid.html.base.tags.inputFile.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputFile = lucid.html.base.tags.inputFile;
