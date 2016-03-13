<?php

namespace DevLucid;

class bootstrap_nav_anchor extends bootstrap_anchor
{
    public function init()
    {
        parent::init();
        $this->add_class('nav-link');
        $this->allowed_attributes[] = 'data_target';
        $this->parameters[] = 'data_target';
    }

    public function pre_render()
    {
        $parent = $this->parent;
        if(is_null($parent) === false)
        {
            if($parent->has_class('nav-tabs'))
            {
                $href = $this->href;
                $this->href = null;
                $this->data_target = '#'.$href;
            }
        }

        return parent::pre_render();
    }
}