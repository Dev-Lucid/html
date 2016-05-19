<?php
namespace Lucid\Html\Base\Tags;

class orderedList extends \Lucid\Html\Tag
{
	public $tag = 'ol';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['li']) !== true) {
			throw new \Exception('Invalid child. Tag ol only allows these tags as children: li');
		}
		return true;
	}
}
