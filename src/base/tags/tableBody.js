lucid.html.base.tags.tableBody = function(){
	lucid.html.tag.call(this);
	this.tag = 'tbody';
};
lucid.html.base.tags.tableBody.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.tableBody.prototype.constructor = lucid.html.base.tags.tableBody;
lucid.html.builder.tags.tableBody = lucid.html.base.tags.tableBody;

lucid.html.base.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};
