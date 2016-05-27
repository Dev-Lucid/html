<?php
namespace Lucid\Html\Base\Tags;

class inputRadio extends \Lucid\Html\Base\Tags\input
{
	use \Lucid\Html\Base\Traits\Checkable;

	public $tag = 'input';
	public $parameters = ['name', 'value', 'checked', 'postHtml'];
	public $attributes = [
		'type'=>'radio',
	];
}
