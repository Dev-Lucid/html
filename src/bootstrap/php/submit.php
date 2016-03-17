<?php
namespace DevLucid\Tag;

if (class_exists('DevLucid\\Tag\\BaseSubmit') === false) {
    include(__DIR__.'/../../base/php/submit.php');
}

class BootstrapSubmit extends BaseSubmit
{
    use BootstrapPullableTrait, BootstrapModifiableTrait, BootstrapSizeableTrait, BootstrapActivableTrait;

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
