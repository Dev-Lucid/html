<?php
namespace Lucid\Html\Base\Tags;

class anchor extends \Lucid\Html\Tag
{
	public $tag = 'a';
	public $parameters = ['href', 'child'];

	public function init()
	{
		$this->allowedAttributes[] = 'name';
		$this->allowedAttributes[] = 'target';
		parent::init();
	}

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['a']) === true) {
			throw new \Exception('Invalid child. Tag a does not allow these tags as children: a');
		}
	}
}
