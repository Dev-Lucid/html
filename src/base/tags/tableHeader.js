lucid.html.builder.tags.tableHeader = function(){
	lucid.html.tag.call(this);
	this.tag = 'th';
};
lucid.html.builder.tags.tableHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableHeader.prototype.constructor = lucid.html.builder.tags.tableHeader;

lucid.html.builder.tags.tableHeader.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.tableHeader.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag th does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableHeader.prototype.render_colspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};
