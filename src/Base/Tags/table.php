<?php
namespace Lucid\Html\Base\Tags;

class table extends \Lucid\Html\Tag
{
	public $tag = 'table';

	public function init()
	{
		$this->allowedAttributes[] = 'cellpadding';
		$this->allowedAttributes[] = 'cellspacing';
		$this->allowedAttributes[] = 'border';
		$this->allowedAttributes[] = 'width';
		$this->allowedAttributes[] = 'sortable';
		parent::init();
	}

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['thead', 'tfoot', 'tbody', 'tr']) !== true) {
			throw new \Exception('Invalid child. Tag table only allows these tags as children: thead, tfoot, tbody, tr');
		}
		return true;
	}
}
