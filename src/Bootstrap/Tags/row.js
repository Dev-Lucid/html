lucid.html.bootstrap.tags.row = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.addClass('row');
};
lucid.html.bootstrap.tags.row.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.row = lucid.html.bootstrap.tags.row;
