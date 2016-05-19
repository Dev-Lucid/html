lucid.html.base.tags.orderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ol';
};
lucid.html.base.tags.orderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.orderedList.prototype.constructor = lucid.html.base.tags.orderedList;
lucid.html.builder.tags.orderedList = lucid.html.base.tags.orderedList;

lucid.html.base.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};
