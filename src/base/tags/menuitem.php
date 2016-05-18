<?php
namespace Lucid\Html\Base\Tags;

class menuitem extends \Lucid\Html\Tag
{
	public $tag = 'menuitem';

	public function init()
	{
		$this->allowedAttributes[] = 'checked';
		$this->allowedAttributes[] = 'default';
		$this->allowedAttributes[] = 'disabled';
		$this->allowedAttributes[] = 'icon';
		$this->allowedAttributes[] = 'label';
		$this->allowedAttributes[] = 'radiogroup';
		$this->allowedAttributes[] = 'type';
		parent::init();
	}
}
