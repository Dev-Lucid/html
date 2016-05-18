lucid.html.builder.tags.tableBody = function(){
	this.tag = 'tbody';
};
lucid.html.builder.tags.tableBody.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};
