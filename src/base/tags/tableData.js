lucid.html.base.tags.tableData = function(){
	lucid.html.tag.call(this);
	this.tag = 'td';
};
lucid.html.base.tags.tableData.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.tableData.prototype.constructor = lucid.html.base.tags.tableData;
lucid.html.builder.tags.tableData = lucid.html.base.tags.tableData;

lucid.html.base.tags.tableData.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.base.tags.tableData.prototype.checkValidChild=function(child){
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
