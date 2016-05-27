lucid.html.base.tags.orderedList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ol';
};
lucid.html.base.tags.orderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.orderedList = lucid.html.base.tags.orderedList;

lucid.html.base.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};
