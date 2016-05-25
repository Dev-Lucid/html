<?php
namespace Lucid\Html\Base\Tags;

class definitionList extends \Lucid\Html\Tag
{
	public $tag = 'dl';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['dd', 'dt']) !== true) {
			throw new \Exception('Invalid child. Tag dl only allows these tags as children: dd, dt');
		}
		return true;
	}
}
