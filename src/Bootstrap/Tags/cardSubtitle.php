<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardSubtitle extends \Lucid\Html\Tag
{
	public $tag = 'h6';

	public function init()
	{
		$this->addClass('card-subtitle');
		$this->addClass('text-muted');
		parent::init();
	}
}
