<?php
namespace Lucid\Html\Bootstrap\Tags;

class card extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('card');
		parent::init();
	}
}
