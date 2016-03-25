<?php
namespace Devlucid\Bootstrap\Tags;

class Select extends \DevLucid\Base\Tags\Select
{
    use \Lucid\Html\Bootstrap\Trait\Pullable, \Lucid\Html\Bootstrap\Trait\Modifiable, \Lucid\Html\Bootstrap\Trait\Sizeable;

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
