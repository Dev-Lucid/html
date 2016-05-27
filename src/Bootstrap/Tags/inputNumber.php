<?php
namespace Lucid\Html\Bootstrap\Tags;

class inputNumber extends \Lucid\Html\Base\Tags\inputNumber
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'input';
	public $bootstrapModifierPrefix = 'form-control';
	public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	public $bootstrapSizePrefix = 'form-control';
	public $bootstrapSizesAllowed = ['sm', 'lg'];

	public function init()
	{
		$this->addClass('form-control');
		parent::init();
	}
}
