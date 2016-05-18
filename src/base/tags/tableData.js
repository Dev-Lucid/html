lucid.html.builder.tags.tableData = function(){
	this.tag = 'td';
};
lucid.html.builder.tags.tableData.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableData.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	this.prototype.init.apply(this);
};

lucid.html.builder.tags.tableData.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag td does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableData.prototype.render_colspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};
