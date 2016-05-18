lucid.html.builder.tags.definitionList = function(){
	this.tag = 'dl';
};
lucid.html.builder.tags.definitionList.prototype = new lucid.html.tag();

lucid.html.builder.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dl'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dl';
	}
};
