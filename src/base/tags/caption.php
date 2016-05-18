<?php
namespace Lucid\Html\Base\Tags;

class caption extends \Lucid\Html\Tag
{
	public $tag = 'caption';

	public function init()
	{
		$this->allowedAttributes[] = 'align';
		parent::init();
	}
}
