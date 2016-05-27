<?php
namespace Lucid\Html\Bootstrap\Tags;

class paragraph extends \Lucid\Html\Base\Tags\paragraph
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'p';
	public $bootstrapModifierPrefix = 'text';
	public $bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
}
