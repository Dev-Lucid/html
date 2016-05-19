<?php
namespace Lucid\Html\Base\Tags;

class tableHead extends \Lucid\Html\Tag
{
	public $tag = 'thead';
	public $preChildrenHtml = '<tr>';
	public $postChildrenHtml = '</tr>';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['th', 'td']) !== true) {
			throw new \Exception('Invalid child. Tag thead only allows these tags as children: th, td');
		}
		return true;
	}
}
