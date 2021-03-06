lucid.html.base.tags.definitionList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dl';
};
lucid.html.base.tags.definitionList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionList = lucid.html.base.tags.definitionList;

lucid.html.base.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dt'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dt';
	}
};
