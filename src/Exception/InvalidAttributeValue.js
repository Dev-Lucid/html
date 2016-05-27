lucid.html.exception.InvalidAttributeValue=function(className, attributeName, badAttributeValue, allowedValues){
    this.message = 'Class '+String(className)+'.'+String(attributeName)+' cannot have value ' + String(badAttributeValue) + '.';
    if (typeof(allowedValues) == 'object' && allowedValues.length > 0){
        this.message += ' Supported attributes are: ' + allowedValues.join(', ');
    }
};
lucid.html.exception.InvalidAttributeValue.prototype = Object.create(Error.prototype);
