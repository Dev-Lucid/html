<?php
namespace Lucid\Html\Base\Tags;

class inputCheckbox extends \Lucid\Html\Base\Tags\input
{
	use \Lucid\Html\Base\Traits\Checkable;

	public $tag = 'input';
	public $parameters = ['name', 'checked', 'postHtml'];
	public $attributes = [
		'type'=>'checkbox',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'value';
		parent::init();
	}
}
