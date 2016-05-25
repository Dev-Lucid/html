<?php
namespace Lucid\Html\Bootstrap\Tags;

class button extends \Lucid\Html\Base\Tags\Button
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'button';
	public $parameters = ['modifier', 'onclick'];
	public $title = null;
	public $bootstrapModifierPrefix = 'btn';
	public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	public $bootstrapSizePrefix = 'btn';
	public $bootstrapSizesAllowed = ['sm', 'lg'];
	public $attributes = [
		'type'=>'button',
	];

	public function init()
	{
		$this->addClass('btn');
		parent::init();
	}
}
