
lucid.html.builder.tags.tableData.prototype.render_colspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};
