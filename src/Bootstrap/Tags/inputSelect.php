<?php
namespace Lucid\Html\Bootstrap\Tags;

class inputSelect extends \Lucid\Html\Base\Tags\inputSelect
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'select';
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
