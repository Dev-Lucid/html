lucid.html.base.tags.tableFoot = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableFoot.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableFoot = lucid.html.base.tags.tableFoot;

lucid.html.base.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};
