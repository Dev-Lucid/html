lucid.html.bootstrap.tags.inputHelp = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'small';
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.inputHelp.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.inputHelp = lucid.html.bootstrap.tags.inputHelp;
