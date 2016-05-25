<?php
namespace Lucid\Html\Bootstrap\Tags;

class formGroup extends \Lucid\Html\Tag
{
	public $tag = 'fieldset';

	public function init()
	{
		$this->addClass('form-group');
		parent::init();
	}
}
