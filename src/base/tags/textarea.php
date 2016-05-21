<?php
namespace Lucid\Html\Base\Tags;

class textarea extends \Lucid\Html\Tag
{
	use \Lucid\Html\Base\Traits\Disableable;

	public $tag = 'textarea';
	public $parameters = ['name', 'rows', 'cols'];

    public function setValue($newValue) 
    {
        if (count($this->children) === 0) {
            $this->add($newValue);
        } else {
            $this->children = [];
            $this->add($newValue);
        }
        return $this;
    }

    public function getValue()
    {
        if (count($this->children) === 0) {
            return '';
        } else {
            return $this->renderChildren();
        }
    }
}
