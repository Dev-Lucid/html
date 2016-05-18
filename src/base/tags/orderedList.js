lucid.html.builder.tags.orderedList = function(){
	this.tag = 'ol';
};
lucid.html.builder.tags.orderedList.prototype = new lucid.html.tag();

lucid.html.builder.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};
