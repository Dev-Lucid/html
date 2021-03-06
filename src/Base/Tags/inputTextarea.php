<?php
namespace Lucid\Html\Base\Tags;

class inputTextarea extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'textarea';
	public $parameters = ['name', 'rows', 'cols'];
	public $allowQuickClose = false;
	public $allowChildren = true;
 
    public function setValue($newValue) : \Lucid\Html\TagInterface
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
