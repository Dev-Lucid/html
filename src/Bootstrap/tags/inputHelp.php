<?php
namespace Lucid\Html\Base\Tags;

class inputHelp extends \Lucid\Html\Tag
{
	public $tag = 'small';

	public function init()
	{
		$this->addClass('text-muted');
		parent::init();
	}
}
