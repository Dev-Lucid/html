<?php
namespace Lucid\Html\Base\Tags;

class inputPassword extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'input';
	public $parameters = ['name', 'value', 'required'];
	public $attributes = [
		'type'=>'password',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'autocomplete';
		$this->allowedAttributes[] = 'size';
		parent::init();
	}
}
