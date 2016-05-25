<?php
namespace Lucid\Html\Base\Tags;

class time extends \Lucid\Html\Tag
{
	public $tag = 'time';

	public function init()
	{
		$this->allowedAttributes[] = 'datetime';
		parent::init();
	}
}
