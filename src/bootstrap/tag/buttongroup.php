<?php
namespace Devlucid\Bootstrap\Tags;

class ButtonGroup extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Pullable, \Lucid\Html\Bootstrap\Trait\Sizeable;

    public $tag = 'div';
    public $bootstrapSizePrefix  = 'btn-group';
    public $bootstrapSizesAllowed = ['sm','lg'];

    public function init()
    {
        parent::init();
        $this->addClass('btn-group');
        $this->attributes['role'] = 'group';

    }

    function setVertical($val)
    {
        \DevLucid\html::errorBoolean($this, 'vertical', $val);
        return $this->toggleClass('btn-group-vertical',$val);
    }

    function getVertical()
    {
        return $this->hasClass('btn-group-vertical');
    }
}
