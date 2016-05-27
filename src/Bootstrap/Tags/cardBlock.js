lucid.html.bootstrap.tags.cardBlock = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.parameters = ['title', 'subtitle'];
	this.title = null;
	this.subtitle = null;
	this.addClass('card-block');
};
lucid.html.bootstrap.tags.cardBlock.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cardBlock = lucid.html.bootstrap.tags.cardBlock;

lucid.html.bootstrap.tags.cardBlock.prototype.getTitle=function(){
    if (this.title === null) {
        this.title = this.build('cardTitle');
    }
    return this.title;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setTitle=function(newValue){
    var title = this.get('title');
    title.children = [];
    title.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.getSubtitle=function(){
    if (this.subtitle === null) {
        this.subtitle = this.build('cardSubtitle');
    }
    return this.subtitle;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setSubtitle=function(newValue){
    var subtitle = this.get('subtitle');
    subtitle.children = [];
    subtitle.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.preChildren=function(){
    if (this.title !== null) {
        this.preChildrenHtml += String(this.title.render());
    }
    if (this.subtitle !== null) {
        this.preChildrenHtml += String(this.subtitle.render());
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};

lucid.html.bootstrap.tags.cardBlock.prototype.add=function(child){
    if (typeof(child) == 'string') {
        lucid.html.tag.prototype.add.call(this, this.build('paragraph').addClass('card-text').add(child));
    } else {
        if (
            (child.tag == 'h3' && child.hasClass('card-title') === true) || 
            (child.tag == 'h4' && child.hasClass('card-title') === true) || 
            (child.tag == 'h6' && child.hasClass('card-subtitle') === true) || 
            (child.tag == 'a' && child.hasClass('btn') === true) || 
            (child.tag == 'a' && child.hasClass('card-link') === true) || 
            (child.tag == 'p' && child.hasClass('card-text') === true)
        ) {
            lucid.html.tag.prototype.add.call(this, child);
        } else {
            lucid.html.tag.prototype.add.call(this, this.build('paragraph').addClass('card-text').add(child));
        }
    }
    return this;
};
