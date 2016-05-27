lucid.html.exception.MissingRequiredProperty=function(className, traitName, propertyName, description){
    this.message = 'Class '+String(className)+' cannot use trait '+String(traitName)+' until it has a property named '+String(propertyName);
    if (typeof(description) == 'string' && description !== '') {
        this.message += String(description);
    }
};
lucid.html.exception.MissingRequiredProperty.prototype = Object.create(Error.prototype);
