lucid.html.base.tags.tableBody = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'tbody';
};
lucid.html.base.tags.tableBody.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableBody = lucid.html.base.tags.tableBody;

lucid.html.base.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};
