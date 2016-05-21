lucid.html.base.tags.head = function(){
	lucid.html.tag.call(this);
	this.tag = 'head';
};
lucid.html.base.tags.head.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.head = lucid.html.base.tags.head;

lucid.html.base.tags.head.prototype.checkValidChild=function(child){
	if (['title', 'link', 'script', 'base', 'meta', 'style'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag head only allows these tags as children: title, link, script, base, meta, style';
	}
};
