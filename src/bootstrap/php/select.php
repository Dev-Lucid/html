<?php
namespace Devlucid\Tag;

if (class_exists('DevLucid\\Tag\\BaseSelect') === false) {
    include(__DIR__.'/../../base/php/select.php');
}


class BootstrapSelect extends BaseSelect
{
    use BootstrapModifiableTrait, BootstrapSizeableTrait, BootstrapPullableTrait;
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
