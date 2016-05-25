<?php
namespace Lucid\Html\Bootstrap\Tags;

class div extends \Lucid\Html\Base\Tags\Span
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'div';
	public $bootstrapModifierPrefix = 'text';
	public $bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
}
