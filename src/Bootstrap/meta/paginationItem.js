
lucid.html.bootstrap.tags.paginationItem.prototype.setDisabled=function(val){
    if (val === true) {
        this.addClass('disabled');
    } else {
        this.removeClass('disabled');
    }
    return this;
};

lucid.html.bootstrap.tags.paginationItem.prototype.getDisabled=function(){
    return this.hasClass('disabled');
};

lucid.html.bootstrap.tags.paginationItem.prototype.preRender=function(){
    if (String(this.href).trim() != '') {
        this.preChildrenHtml += '<a href="' + this.href + '" class="page-link">';
        this.postChildrenHtml = '</a>' + this.postChildrenHtml;    
    }
    return lucid.html.base.tags.listItem.prototype.preRender.call(this);
};