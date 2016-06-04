lucid.html.Selector=function(pattern){
    this.class = null;
    this.tag   = null;
    this.attributeName  = null;
    this.attributeValue = null;
    
    if (typeof(pattern) == 'string') {
        pattern = pattern.split('.');
        if (pattern.length > 1) {
            this.class = pattern.pop();
        } 
        pattern = pattern[0];
        
        pattern = pattern.split('[');
        if (pattern.length > 1) {
            var attr = String(pattern[1]).replace(']', '').split('=');
            this.attributeName  = attr[0];
            this.attributeValue = attr[1];
        }
        pattern = pattern[0];
        
        if (pattern !== '') {
            this.tag = pattern;
        }
    }
};

lucid.html.Selector.prototype.matchTag=function(tagToMatch){
    this.tag = tagToMatch;
    return this;
};

lucid.html.Selector.prototype.matchClass=function(classToMatch){
    this.class = classToMatch;
    return this;
};

lucid.html.Selector.prototype.matchAttribute=function(attributeName, attributeValue){
    this.attributeName  = attributeName;
    this.attributeValue = attributeValue;
    return this;
};

lucid.html.Selector.prototype.test=function(tagToTest) {
    var matches = true;
    if (this.tag !== null) {
        if (this.tag != tagToTest.getTag()) {
            matches = false;
        }
    }
    if (this.class !== null) {
        if (tagToTest.hasClass(this.class) === false) {
            matches = false;
        }
    }
    if (this.attributeName !== null) {
        if (this.attributeValue != tagToTest.get(this.attributeName)) {
            matches = false;
        }
    }
    return matches;    
};
