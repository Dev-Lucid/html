<?php
namespace Lucid\Html\Bootstrap\Tags;

class anchor extends \Lucid\Html\Base\Tags\Anchor
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'a';
	public $bootstrapModifierPrefix = 'text';
	public $bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
}
