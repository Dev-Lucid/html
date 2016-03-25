<?php
namespace Lucid\Html\Bootstrap\Tags;
use \Lucid\html\html;

class anchorButton extends \Lucid\Html\Base\Tags\Anchor
{
    use \Lucid\Html\Bootstrap\Traits\Modifiable, \Lucid\Html\Bootstrap\Traits\Sizeable, \Lucid\Html\Bootstrap\Traits\Pullable;

    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $bootstrapModifierPrefix  = 'btn';
    public $bootstrapSizePrefix = 'btn';
    public $bootstrapSizesAllowed = ['sm','lg',];

    public $parameters = ['href','child','modifier',];

    public function init()
    {
        parent::init();
        $this->addClass('btn');
        $this->modifier('primary');
    }
}
