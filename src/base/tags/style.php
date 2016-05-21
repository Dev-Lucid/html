<?php
namespace Lucid\Html\Base\Tags;

class style extends \Lucid\Html\Tag
{
	public $tag = 'style';
	public $parameters = ['media'];

	public function init()
	{
		$this->allowedAttributes[] = 'scoped';
		$this->allowedAttributes[] = 'type';
		parent::init();
	}
}
