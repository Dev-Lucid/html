<?php
namespace Lucid\Html\Base\Tags;

class blockquote extends \Lucid\Html\Tag
{
	public $tag = 'blockquote';

	public function init()
	{
		$this->allowedAttributes[] = 'cite';
		parent::init();
	}
}
