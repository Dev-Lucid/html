lucid.html.bootstrap.tags.tableRow = function(factory){
	this.factory = factory;
	lucid.html.base.tags.tableRow.apply(this, arguments);
	this.tag = 'tr';
	this.bootstrapModifierPrefix = 'table';
	this.bootstrapModifiersAllowed = ['success', 'warning', 'danger', 'info', 'primary'];
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);

};
lucid.html.bootstrap.tags.tableRow.prototype = Object.create(lucid.html.base.tags.tableRow.prototype);
lucid.html.factory.tags.tableRow = lucid.html.bootstrap.tags.tableRow;
