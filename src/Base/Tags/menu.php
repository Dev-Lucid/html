<?php
namespace Lucid\Html\Base\Tags;

class menu extends \Lucid\Html\Tag
{
	public $tag = 'menu';

	public function init()
	{
		$this->allowedAttributes[] = 'type';
		$this->allowedAttributes[] = 'label';
		parent::init();
	}
}
