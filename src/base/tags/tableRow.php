<?php
namespace Lucid\Html\Base\Tags;

class tableRow extends \Lucid\Html\Tag
{
	public $tag = 'tr';

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['th', 'td']) !== true) {
			throw new \Exception('Invalid child. Tag tr only allows these tags as children: th, td');
		}
	}
}
