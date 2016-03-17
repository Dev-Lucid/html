<?php

namespace DevLucid\Tag;

class BootstrapButton extends BaseButton
{
    use BootstrapPullableTrait, BootstrapModifiableTrait, BootstrapSizeableTrait, BootstrapActivableTrait;

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
