<?php
namespace Lucid\Html\Base\Tags;

class option extends \Lucid\Html\Tag
{
	public $tag = 'option';
	public $parameters = ['value', 'child', 'selected'];

    public function setSelected($val) : \Lucid\Html\TagInterface
    {
        if (is_null($this->parent) === false) {
            foreach ($this->parent->children as $child) {
                unset($child->attributes['selected']);
            }
        }
        $this->attributes['selected'] = ($val === true)?'selected':null;
        return $this;
    }

    public function getSelected() : bool
    {
        return (isset($this->attributes['selected']) === true && $this->attributes['selected'] == 'selected');
    }
}
