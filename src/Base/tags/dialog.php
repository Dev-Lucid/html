<?php
namespace Lucid\Html\Base\Tags;

class dialog extends \Lucid\Html\Tag
{
	public $tag = 'dialog';

	public function init()
	{
		$this->allowedAttributes[] = 'open';
		parent::init();
	}

    public function setOpen($newValue) 
    {
        if ($val !== true && $val !== false) {
            throw new \Exception('Attribute open only accepts values true or false.');
        }
        $this->attributes['open'] = $val;
        return $this;
    }

    public function renderOpen()
    {
        $val = ($this->attributes['open'] === true)?'open':null;
        return $val;
    }
}
