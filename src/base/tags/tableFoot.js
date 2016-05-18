lucid.html.builder.tags.tableFoot = function(){
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableFoot.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};
