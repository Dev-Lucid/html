lucid.html.base.tags.tableData = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'td';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableData.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableData = lucid.html.base.tags.tableData;

lucid.html.base.tags.tableData.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag td does not allow these tags as children: th, td, tr';
	}
};

lucid.html.factory.tags.tableData.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};
