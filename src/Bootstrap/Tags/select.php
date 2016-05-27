<?php
namespace Lucid\Html\Bootstrap\Tags;

class Select extends \Lucid\Html\Base\Tags\Select
{
    use \Lucid\Html\Bootstrap\Traits\Pullable, \Lucid\Html\Bootstrap\Traits\Modifiable, \Lucid\Html\Bootstrap\Traits\Sizeable;

    public $bootstrapModifierPrefix  = 'select';
    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $bootstrapSizePrefix  = 'form-control';
    public $bootstrapSizesAllowed = ['sm', 'lg', ];

    public function init()
    {
        parent::init();
        $this->addClass('form-control');
    }
}
