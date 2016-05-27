<?php
namespace Lucid\Html\Base\Tags;

class column extends \Lucid\Html\Tag
{
	public $tag = 'col';

	public function init()
	{
		$this->allowedAttributes[] = 'width';
		$this->allowedAttributes[] = 'span';
		parent::init();
	}
}
