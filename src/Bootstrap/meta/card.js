
lucid.html.bootstrap.tags.card.prototype.getHeader=function(){
    if (this.header === null) {
        this.header = this.build('cardHeader');
    }
    return this.header;
};

lucid.html.bootstrap.tags.card.prototype.setHeader=function(newValue){
    var header = this.get('header');
    header.children = [];
    header.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getBlock=function(){
    if (this.block === null) {
        this.block = this.build('cardBlock');
        this.add(this.block);
    }
    return this.block;
};

lucid.html.bootstrap.tags.card.prototype.setBlock=function(newValue){
    var block = this.get('block');
    block.children = [];
    block.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getFooter=function(){
    if (this.footer === null) {
        this.footer = this.build('cardFooter');
    }
    return this.footer;
};

lucid.html.bootstrap.tags.card.prototype.setFooter=function(newValue){
    var footer = this.get('footer');
    footer.children = [];
    footer.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getTitle=function(){
    return this.get('block').get('title');
};

lucid.html.bootstrap.tags.card.prototype.setTitle=function(newValue){
    var block = this.get('block');
    block.set('title', newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getSubtitle=function(){
    return this.get('block').get('subtitle');
};

lucid.html.bootstrap.tags.card.prototype.setSubtitle=function(newValue){
    var block = this.get('block');
    block.set('subtitle', newValue);
    return this;
};


lucid.html.bootstrap.tags.card.prototype.preChildren=function(){
    if (this.header !== null) {
        this.preChildrenHtml += String(this.header.render());
    }
    if (this.footer !== null) {
        this.postChildrenHtml += String(this.footer.render());
    }
    
    for (var i=0; i<this.children.length; i++) {
        if (typeof(this.children[i]) == 'object') {
            if (this.children[i].tag == 'ul') {
                for (var j=0; j<this.children[i].children.length; j++) {
                    this.children[i].children[j].addClass('list-group-item');
                }
            }
            if (this.children[i].tag == 'img') {
                if (i === 0 && this.header === null) {
                    this.children[i].addClass('card-img-top');
                } else if (i == (this.children.length - 1) && this.footer === null) {
                    this.children[i].addClass('card-img-bottom');
                }
            }
        }
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};


lucid.html.bootstrap.tags.card.prototype.add=function(child){
    if (typeof(child) == 'object') {
        if (
            child.hasClass('card-header') === true || 
            child.hasClass('card-block') === true || 
            child.hasClass('card-footer')  === true || 
            child.tag == 'ul' || 
            child.tag == 'img'
        ) {
            if (child.tag == 'ul') {
                child.addClass('list-group').addClass('list-group-flush');
            }
            return lucid.html.tag.prototype.add.call(this, child);
        } else {
            var block = this.get('block');
            block.add(child);
            return this;
        }
    } else {
        var block = this.get('block');
        block.add(child);
        return this;
    }
};
