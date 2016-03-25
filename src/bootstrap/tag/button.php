<?php

namespace Lucid\Html\Bootstrap\Tag;

class Button extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Pullable, \Lucid\Html\Bootstrap\Trait\Modifiable, \Lucid\Html\Bootstrap\Trait\Sizeable, \Lucid\Html\Bootstrap\Trait\Activable;

    public $bootstrapModifierPrefix   = 'btn';
    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'link', 'primary-outline', 'secondary-outline', 'success-outline', 'info-outline', 'danger-outline', 'warning-outline', ];
    public $bootstrapSizePrefix       = 'btn';
    public $bootstrapSizesAllowed     = ['sm', 'lg', ];

    public $parameters = ['child','modifier', 'onclick', 'type'];

    public function init()
    {
        $this->addClass('btn');
        parent::init();
    }
}
