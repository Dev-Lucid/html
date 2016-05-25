<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardTitle extends \Lucid\Html\Tag
{
	public $tag = 'h4';

	public function init()
	{
		$this->addClass('card-title');
		parent::init();
	}
}
