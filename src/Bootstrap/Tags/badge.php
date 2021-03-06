<?php
namespace Lucid\Html\Bootstrap\Tags;

class badge extends \Lucid\Html\Tag
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;
	use \Lucid\Html\Bootstrap\Traits\Pillable;

	public $tag = 'span';
	public $parameters = ['modifier'];
	public $bootstrapPillPrefix = 'tag';
	public $bootstrapModifierPrefix = 'tag';
	public $bootstrapModifiersAllowed = ['default', 'primary', 'secondary', 'success', 'warning','danger', 'info'];

	public function init()
	{
		$this->addClass('tag');
		parent::init();
	}
}
