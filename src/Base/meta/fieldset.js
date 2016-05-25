
lucid.html.base.tags.fieldset.prototype.getLegend=function(){
    if (this.legend === null) {
        this.legend = this.build('legend');
    }
    return this.legend;
};

lucid.html.base.tags.fieldset.prototype.setLegend=function(newValue){
    var legend = this.get('legend');
    legend.children = [];
    legend.add(newValue);
    return this;
};

lucid.html.base.tags.fieldset.prototype.preChildren=function(){
    if (this.legend !== null) {
        this.preChildrenHtml += String(this.legend.render())
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};
