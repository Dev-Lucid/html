<?php
namespace Lucid\Html\Bootstrap\Tags;

class Submit extends \Lucid\Html\Base\Tags\Submit
{
    use \Lucid\Html\Bootstrap\Traits\Pullable, \Lucid\Html\Bootstrap\Traits\Modifiable, \Lucid\Html\Bootstrap\Traits\Sizeable, \Lucid\Html\Bootstrap\Traits\Activable;

    public $bootstrapModifierPrefix  = 'btn';
    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'link', 'primary-outline', 'secondary-outline', 'success-outline', 'info-outline', 'danger-outline', 'warning-outline', ];
    public $bootstrapSizePrefix  = 'btn';
    public $bootstrapSizesAllowed = ['sm', 'lg', ];

    public $parameters = ['child','modifier',];

    public function init()
    {
        parent::init();
        $this->tag = 'button';
        $this->addClass('btn');
        $this->type='submit';
        $this->modifier = 'primary';
    }
}
