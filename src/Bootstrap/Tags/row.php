<?php
namespace Lucid\Html\Bootstrap\Tags;

class row extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('row');
		parent::init();
	}
}
