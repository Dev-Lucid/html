<?php
namespace Lucid\Html\Base\Tags;

class button extends \Lucid\Html\Tag
{
	use \Lucid\Html\Base\Traits\Disableable;
	use \Lucid\Html\Base\Traits\Autofocusable;

	public $tag = 'button';
	public $parameters = ['child', 'onclick'];
	public $attributes = [
		'type'=>'button',
	];

	public function init()
	{
		$this->allowedAttributes[] = 'type';
		$this->allowedAttributes[] = 'name';
		parent::init();
	}
}
