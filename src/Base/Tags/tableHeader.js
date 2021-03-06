lucid.html.base.tags.tableHeader = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'th';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableHeader = lucid.html.base.tags.tableHeader;

lucid.html.base.tags.tableHeader.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag th does not allow these tags as children: th, td, tr';
	}
};

lucid.html.factory.tags.tableHeader.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};
