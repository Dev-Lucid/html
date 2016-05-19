<?php
namespace Lucid\Html\Base\Tags;

class tableBody extends \Lucid\Html\Tag
{
	public $tag = 'tbody';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['tr']) !== true) {
			throw new \Exception('Invalid child. Tag tbody only allows these tags as children: tr');
		}
		return true;
	}
}
