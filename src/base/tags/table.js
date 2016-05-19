lucid.html.base.tags.table = function(){
	lucid.html.tag.call(this);
	this.tag = 'table';
};
lucid.html.base.tags.table.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.table.prototype.constructor = lucid.html.base.tags.table;
lucid.html.builder.tags.table = lucid.html.base.tags.table;

lucid.html.base.tags.table.prototype.init=function(){
	this.allowedAttributes.push('cellpadding');
	this.allowedAttributes.push('cellspacing');
	this.allowedAttributes.push('border');
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('sortable');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.base.tags.table.prototype.checkValidChild=function(child){
	if (['thead', 'tfoot', 'tbody', 'tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag table only allows these tags as children: thead, tfoot, tbody, tr';
	}
};
