<?php

namespace DevLucid;

class bootstrap_alert extends base_tag
{
    use trait_bootstrap_pullable, trait_bootstrap_modifiable;

    public $_bootstrap_modifier_prefix  = 'alert';
    public $_bootstrap_modifier_allowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', ];

    public $parameters = ['modifier','title', 'msg',];

    public $autoclose = false;
    public $title = '';

    public function init()
    {
        parent::init();
        $this->tag = 'div';
        $this->add_class('alert');
    }

    public function pre_render()
    {
        if($this->title != '')
        {
            $this->pre_children_html = html::strong($this->title);
        }
        return parent::pre_render();
    }
}
