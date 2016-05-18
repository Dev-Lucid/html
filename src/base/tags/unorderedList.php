<?php
namespace Lucid\Html\Base\Tags;

class unorderedList extends \Lucid\Html\Tag
{
	public $tag = 'ul';

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['li']) !== true) {
			throw new \Exception('Invalid child. Tag ul only allows these tags as children: li');
		}
	}
}
