lucid.html.base.tags.definitionList = function(){
	lucid.html.tag.call(this);
	this.tag = 'dl';
};
lucid.html.base.tags.definitionList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionList = lucid.html.base.tags.definitionList;

lucid.html.base.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dt'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dt';
	}
};
