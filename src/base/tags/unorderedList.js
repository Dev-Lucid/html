lucid.html.builder.tags.unorderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ul';
};
lucid.html.builder.tags.unorderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.unorderedList.prototype.constructor = lucid.html.builder.tags.unorderedList;

lucid.html.builder.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};
