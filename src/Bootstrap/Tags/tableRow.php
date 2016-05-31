<?php
namespace Lucid\Html\Bootstrap\Tags;

class tableRow extends \Lucid\Html\Base\Tags\tableRow
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;

	public $tag = 'tr';
	public $bootstrapModifierPrefix = 'table';
	public $bootstrapModifiersAllowed = ['success', 'warning', 'danger', 'info', 'primary'];
}
