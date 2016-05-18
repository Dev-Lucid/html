lucid.html.builder.tags.unorderedList = function(){
	this.tag = 'ul';
};
lucid.html.builder.tags.unorderedList.prototype = new lucid.html.tag();

lucid.html.builder.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};
