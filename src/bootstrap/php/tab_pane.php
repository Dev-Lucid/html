<?php
namespace Devlucid;

class bootstrap_tab_pane extends base_tag
{
    public $tag = 'div';
    public $parameters = ['id',];
    use trait_bootstrap_activable;

    public function init()
    {
        parent::init();
        $this->add_class('tab-pane');
        $this->add_class('fade');
        $this->attributes['role'] = 'tabpanel';
    }

    public function pre_render()
    {
        $this->toggle_class('in', ($this->active() === true));
    }
}