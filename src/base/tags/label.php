<?php
namespace Lucid\Html\Base\Tags;

class label extends \Lucid\Html\Tag
{
	public $tag = 'label';
	public $parameters = ['for', 'child'];

	public function init()
	{
		$this->allowedAttributes[] = 'for';
		parent::init();
	}
}
