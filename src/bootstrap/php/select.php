<?php
namespace Devlucid;

class bootstrap_select extends base_select
{
    use trait_bootstrap_modifiable, trait_bootstrap_sizeable, trait_bootstrap_pullable;
    public $_bootstrap_modifier_prefix  = 'select';
    public $_bootstrap_modifier_allowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $_bootstrap_size_prefix  = 'form-control';
    public $_bootstrap_size_allowed = ['sm', 'lg', ];

    public function init()
    {
        parent::init();
        $this->add_class('form-control');
    }
}
