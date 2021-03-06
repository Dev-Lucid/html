<?php
namespace Lucid\Html\Bootstrap\Tags;

class span extends \Lucid\Html\Base\Tags\span
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'span';
	public $bootstrapModifierPrefix = 'text';
	public $bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
}
