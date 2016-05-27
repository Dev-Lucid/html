<?php
namespace Lucid\Html\Bootstrap\Tags;

class breadcrumb extends \Lucid\Html\Base\Tags\orderedList
{
	public $tag = 'ol';

	public function init()
	{
		$this->addClass('breadcrumb');
		parent::init();
	}
}
