lucid.html.builder.tags.tableHead = function(){
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableHead.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};
