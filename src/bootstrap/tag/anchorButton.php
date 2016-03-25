<?php

namespace Lucid\Html\Bootstrap\Tag;

class anchorButton extends \DevLucid\Base\Tags\Anchor
{
    use \Lucid\Html\Bootstrap\Trait\Modifiable, \Lucid\Html\Bootstrap\Trait\Sizeable, \Lucid\Html\Bootstrap\Trait\Pullable;

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
