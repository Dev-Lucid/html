lucid.html.base.tags.dataList = function(){
	lucid.html.tag.call(this);
	this.tag = 'datalist';
};
lucid.html.base.tags.dataList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.dataList = lucid.html.base.tags.dataList;

lucid.html.base.tags.dataList.prototype.checkValidChild=function(child){
	if (['option'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag datalist only allows these tags as children: option';
	}
};
