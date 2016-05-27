<?php
namespace Lucid\Html\Base\Tags;

class dataList extends \Lucid\Html\Tag
{
	public $tag = 'datalist';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['option']) !== true) {
			throw new \Exception('Invalid child. Tag datalist only allows these tags as children: option');
		}
		return true;
	}
}
