lucid.html.bootstrap.tags.inputFile = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputFile.apply(this, arguments);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control-file');
};
lucid.html.bootstrap.tags.inputFile.prototype = Object.create(lucid.html.base.tags.inputFile.prototype);
lucid.html.factory.tags.inputFile = lucid.html.bootstrap.tags.inputFile;
