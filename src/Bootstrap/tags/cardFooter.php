<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardFooter extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('card-footer');
		$this->addClass('text-muted');
		parent::init();
	}
}
