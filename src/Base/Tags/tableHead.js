lucid.html.base.tags.tableHead = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableHead.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableHead = lucid.html.base.tags.tableHead;

lucid.html.base.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};
