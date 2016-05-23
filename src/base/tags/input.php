<?php
namespace Lucid\Html\Base\Tags;

class input extends \Lucid\Html\Tag
{
	use \Lucid\Html\Base\Traits\Disableable;
	use \Lucid\Html\Base\Traits\Readonlyable;
	use \Lucid\Html\Base\Traits\Requireable;

	public $tag = 'input';
	public $allowQuickClose = true;
	public $allowChildren = false;
}
