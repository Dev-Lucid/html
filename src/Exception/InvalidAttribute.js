lucid.html.exception.InvalidAttribute=function(className, badAttribute, allowedAttributes){
    this.message = 'Class '+String(className)+' cannot have attribute ' + String(badAttribute) + '. Supported attributes are: ' + allowedAttributes.join(', ');
};
lucid.html.exception.InvalidAttribute.prototype = Object.create(Error.prototype);
