lucid.html.base.tags.unorderedList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ul';
};
lucid.html.base.tags.unorderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.unorderedList = lucid.html.base.tags.unorderedList;

lucid.html.base.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};
