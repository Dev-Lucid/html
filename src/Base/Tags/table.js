lucid.html.base.tags.table = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'table';
	this.allowedAttributes.push('cellpadding');
	this.allowedAttributes.push('cellspacing');
	this.allowedAttributes.push('border');
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('sortable');
};
lucid.html.base.tags.table.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.table = lucid.html.base.tags.table;

lucid.html.base.tags.table.prototype.checkValidChild=function(child){
	if (['thead', 'tfoot', 'tbody', 'tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag table only allows these tags as children: thead, tfoot, tbody, tr';
	}
};
