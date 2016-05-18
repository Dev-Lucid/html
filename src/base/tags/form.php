<?php
namespace Lucid\Html\Base\Tags;

class form extends \Lucid\Html\Tag
{
	public $tag = 'form';
	public $parameters = ['name', 'action'];

	public function init()
	{
		$this->allowedAttributes[] = 'onsubmit';
		$this->allowedAttributes[] = 'enctype';
		$this->allowedAttributes[] = 'method';
		$this->allowedAttributes[] = 'target';
		parent::init();
	}

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['form']) === true) {
			throw new \Exception('Invalid child. Tag form does not allow these tags as children: form');
		}
	}
}
