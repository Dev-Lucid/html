<?php
namespace Lucid\Html\Bootstrap\Tags;

class Textarea extends \Lucid\Html\Base\Tags\Textarea
{
    use \Lucid\Html\Bootstrap\Traits\Pullable, \Lucid\Html\Bootstrap\Traits\Modifiable, \Lucid\Html\Bootstrap\Traits\Sizeable;

    public $tag = 'textarea';
    public $bootstrapModifierPrefix  = 'has';
    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $bootstrapSizePrefix  = 'form-control';
    public $bootstrapSizesAllowed = ['sm', 'lg', ];

    public function init()
    {
        parent::init();
        $this->addClass('form-control');
    }
}
