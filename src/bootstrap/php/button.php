<?php

namespace DevLucid;

class bootstrap_button extends base_button
{
    use trait_bootstrap_pullable, trait_bootstrap_modifiable, trait_bootstrap_sizeable, trait_bootstrap_activable;

    public $_bootstrap_modifier_prefix  = 'btn';
    public $_bootstrap_modifier_allowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'link', 'primary-outline', 'secondary-outline', 'success-outline', 'info-outline', 'danger-outline', 'warning-outline', ];
    public $_bootstrap_size_prefix  = 'btn';
    public $_bootstrap_size_allowed = ['sm', 'lg', ];

    public $parameters = ['child','modifier', 'onclick', 'type'];

    public function init()
    {
        $this->add_class('btn');
        parent::init();
    }
}
