lucid.html.builder.tags.tableFoot = function(){
	lucid.html.tag.call(this);
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableFoot.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableFoot.prototype.constructor = lucid.html.builder.tags.tableFoot;

lucid.html.builder.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};
