lucid.html.builder.tags.anchor = function(){
    this.tag = 'a';
    this.parameters = ['href', 'child'];
};
lucid.html.builder.tags.anchor.prototype = new lucid.html.tag();

lucid.html.builder.tags.anchor.prototype.init=function(){
    this.allowedAttributes.push('name');
    this.allowedAttributes.push('target');
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
    if (child.tag == 'a') {
        throw 'Anchor cannot contain another anchor';
    }
};
