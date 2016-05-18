<?php
namespace Lucid\Html\Base\Tags;

class definitionList extends \Lucid\Html\Tag
{
	public $tag = 'dl';

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['dd', 'dl']) !== true) {
			throw new \Exception('Invalid child. Tag dl only allows these tags as children: dd, dl');
		}
	}
}
