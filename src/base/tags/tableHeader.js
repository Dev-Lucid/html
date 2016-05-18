lucid.html.builder.tags.tableHeader = function(){
	this.tag = 'th';
};
lucid.html.builder.tags.tableHeader.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableHeader.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	this.prototype.init.apply(this);
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
