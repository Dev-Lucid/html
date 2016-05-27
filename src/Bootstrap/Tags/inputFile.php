<?php
namespace Lucid\Html\Bootstrap\Tags;

class inputFile extends \Lucid\Html\Base\Tags\inputFile
{
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'input';
	public $bootstrapSizePrefix = 'form-control';
	public $bootstrapSizesAllowed = ['sm', 'lg'];

	public function init()
	{
		$this->addClass('form-control-file');
		parent::init();
	}
}
