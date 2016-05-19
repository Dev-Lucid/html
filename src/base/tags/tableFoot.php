<?php
namespace Lucid\Html\Base\Tags;

class tableFoot extends \Lucid\Html\Tag
{
	public $tag = 'tfoot';
	public $preChildrenHtml = '<tr>';
	public $postChildrenHtml = '</tr>';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['th', 'td']) !== true) {
			throw new \Exception('Invalid child. Tag tfoot only allows these tags as children: th, td');
		}
		return true;
	}
}
