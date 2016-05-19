<?php
namespace Lucid\Html\Base\Tags;

class body extends \Lucid\Html\Tag
{
	public $tag = 'body';

	public function init()
	{
		$this->allowedAttributes[] = 'align';
		parent::init();
	}
}
