<?php
namespace Lucid\Html\Base\Tags;

class inputUrl extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'input';
	public $parameters = ['name', 'value', 'required', 'placeholder'];
	public $attributes = [
		'type'=>'url',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'autocomplete';
		$this->allowedAttributes[] = 'size';
		parent::init();
	}
}
