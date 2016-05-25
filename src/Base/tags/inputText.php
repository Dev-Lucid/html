<?php
namespace Lucid\Html\Base\Tags;

class inputText extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'input';
	public $parameters = ['name', 'value', 'required', 'placeholder'];
	public $attributes = [
		'type'=>'text',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'autocomplete';
		$this->allowedAttributes[] = 'size';
		parent::init();
	}
}
