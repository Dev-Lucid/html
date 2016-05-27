lucid.html.exception.ChildrenNotAllowed=function(className){
    this.message = 'Class '+String(className)+' cannot have children.';
};
lucid.html.exception.ChildrenNotAllowed.prototype = Object.create(Error.prototype);
