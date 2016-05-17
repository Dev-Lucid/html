<?php

lucid.html.tags.alert = function(){
}

lucid.html.tags.alert.prototype.init=function() {

    this.bootstrapModifierPrefix = 'alert';
    this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning'];
    this.parameters = ['modifier','title', 'msg'];
    this.autoclose = false;
    this.title = '';

    this.addTrait('bootstrap/traits/pullable', 'bootstrap/traits/modifiable');
    this.tag = 'div';
    this.addClass('alert');
    this.prototype.init();
};


lucid.html.tags.alert.prototype.preRender=function() {
    if (this.title !== '') {
        this.preChildrenHtml = lucid.html.build('strong', this.title);
    }
    return this.prototype.preRender();
};
