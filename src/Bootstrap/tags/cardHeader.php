<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardHeader extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('card-header');
		parent::init();
	}
}
