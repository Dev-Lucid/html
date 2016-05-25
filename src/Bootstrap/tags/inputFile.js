lucid.html.bootstrap.tags.inputFile = function(){
	lucid.html.base.tags.inputFile.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control-file');
};
lucid.html.bootstrap.tags.inputFile.prototype = Object.create(lucid.html.base.tags.inputFile.prototype);
lucid.html.builder.tags.inputFile = lucid.html.bootstrap.tags.inputFile;
