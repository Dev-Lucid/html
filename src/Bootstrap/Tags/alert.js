lucid.html.bootstrap.tags.alert = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.parameters = ['modifier', 'title'];
	this.title = null;
	this.bootstrapModifierPrefix = 'alert';
	this.bootstrapModifiersAllowed = ['success', 'warning','danger', 'info'];
	this.attributes['role'] = 'alert';
	this.addClass('alert');
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.alert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.alert = lucid.html.bootstrap.tags.alert;

lucid.html.bootstrap.tags.alert.prototype.getTitle=function(){
    if (this.title === null) {
        this.title = this.build('strong');
    }
    return this.title;
};

lucid.html.bootstrap.tags.alert.prototype.setTitle=function(newValue){
    var title = this.get('title');
    title.children = [];
    title.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.alert.prototype.preChildren=function(){
    if (this.title !== null) {
        this.preChildrenHtml += String(this.title.render())+ ' ';
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};
