<?php
namespace Lucid\Html\Bootstrap\Tags;

class inputHelp extends \Lucid\Html\Tag
{
	public $tag = 'small';

	public function init()
	{
		$this->addClass('text-muted');
		parent::init();
	}
}
