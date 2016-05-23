<?php
namespace Lucid\Html\Base\Tags;

class inputNumber extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'input';
	public $parameters = ['name', 'value', 'required', 'placeholder'];
	public $attributes = [
		'type'=>'number',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'autocomplete';
		$this->allowedAttributes[] = 'size';
		parent::init();
	}
}
