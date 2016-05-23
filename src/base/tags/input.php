<?php
namespace Lucid\Html\Base\Tags;

class input extends \Lucid\Html\Tag
{
	use \Lucid\Html\Base\Traits\Disableable;

	public $tag = 'input';
	public $allowQuickClose = true;
	public $allowChildren = false;
}
