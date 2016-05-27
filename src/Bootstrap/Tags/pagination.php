<?php
namespace Lucid\Html\Bootstrap\Tags;

class pagination extends \Lucid\Html\Base\Tags\unorderedList
{
	public $tag = 'ul';

	public function init()
	{
		$this->addClass('pagination');
		parent::init();
	}
}
