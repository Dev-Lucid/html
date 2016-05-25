<?php
namespace Lucid\Html\Base\Tags;

class meter extends \Lucid\Html\Tag
{
	public $tag = 'meter';

	public function init()
	{
		$this->allowedAttributes[] = 'form';
		$this->allowedAttributes[] = 'high';
		$this->allowedAttributes[] = 'low';
		$this->allowedAttributes[] = 'max';
		$this->allowedAttributes[] = 'min';
		$this->allowedAttributes[] = 'optimum';
		$this->allowedAttributes[] = 'value';
		parent::init();
	}
}
