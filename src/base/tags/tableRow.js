lucid.html.builder.tags.tableRow = function(){
	this.tag = 'tr';
};
lucid.html.builder.tags.tableRow.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};
