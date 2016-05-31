<?php
namespace Lucid\Html\Bootstrap\Tags;

class label extends \Lucid\Html\Base\Tags\div
{
	use \Lucid\Html\Bootstrap\Traits\Gridable;

	public $tag = 'label';
	public $parameters = ['for'];
}
