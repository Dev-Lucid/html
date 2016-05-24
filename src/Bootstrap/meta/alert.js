
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
