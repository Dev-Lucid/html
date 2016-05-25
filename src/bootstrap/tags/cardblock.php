<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardBlock extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('card-block');
		parent::init();
	}
}
