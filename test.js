var lucid = {
    html:{}
};

lucid.html.tag=function(){
};
lucid.html.tag.prototype.tag = 'notag';
lucid.html.tag.prototype.allowedAttributes = ['id'];

lucid.html.tag.body = function(){
    this.tag = 'body';
    this.allowedAttributes.push('onload');
};
lucid.html.tag.body.prototype = new lucid.html.tag();

function dumpTag(tag) {
    for(var key in tag) {
        console.log(key+': '+tag[key]);
    }
}

dumpTag(new lucid.html.tag());
dumpTag(new lucid.html.tag.body());
