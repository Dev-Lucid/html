lucid.html.base.tags.inputHelp = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
	this.addClass('text-muted');
};
lucid.html.base.tags.inputHelp.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputHelp = lucid.html.base.tags.inputHelp;
