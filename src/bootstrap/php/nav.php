<?php
namespace Devlucid;

class bootstrap_nav extends base_tag
{
    public $tag = 'ul';
    public $active_target = null;
    public $parameters = ['active_target',];
    public $panes = [];
    public $post_render_tabs = true;

    public function init()
    {
        parent::init();
        $this->add_class('nav');
        $this->add_class('nav-pills');
    }

    public function pre_render()
    {
        $is_tabs = $this->get_tabs();
        $active_index = false;
        for($i=0; $i<count($this->children); $i++)
        {
            if($this->children[$i]->href == $this->active_target)
            {
                $this->children[$i]->active(true);
            }
            if($is_tabs === true)
            {
                $this->children[$i]->attributes['data-toggle'] = 'tab';
                $this->children[$i]->attributes['role'] = 'tab';
                if($this->children[$i]->active() === true)
                {
                    $active_index = $i;
                    $this->panes[$i]->active(true);
                }
            }
            $this->children[$i]->pre_html = '<li class="nav-item">'.$this->children[$i]->pre_html;
            $this->children[$i]->post_html = $this->children[$i]->post_html.'</li>';
        }

        if($is_tabs === true && $active_index === false)
        {
            $this->children[0]->active(true);
            $this->panes[0]->active(true);
            $this->active_target = $this->children[0]->href;
        }

        return parent::pre_render();
    }

    public function set_pills($val)
    {
        if($val === true)
        {
            $this->remove_class('nav-inline');
            $this->remove_class('nav-tabs');
            $this->add_class('nav-pills');
        }
        else
        {
            $this->remove_class('nav-pills');
        }
        return $this;
    }

    public function get_pills()
    {
        return $this->has_class('nav-pills');
    }

    public function set_stacked($val)
    {
        if($val === true)
        {
            $this->set_pills(true);
            $this->add_class('nav-stacked');
        }
        else
        {
            $this->remove_class('nav-stacked');
        }
        return $this;
    }

    public function get_stacked()
    {
        return $this->has_class('nav-stacked');
    }


    public function set_tabs($val)
    {
        if($val === true)
        {
            $this->remove_class('nav-inline');
            $this->remove_class('nav-pills');
            $this->add_class('nav-tabs');
            $this->attributes['role'] = 'tablist';

            $link_count = count($this->children);
            $pane_count = count($this->panes);

            while(count($this->panes) < $link_count)
            {
                $this->add_pane();
            }
        }
        else
        {
            $this->remove_class('nav-tabs');
            $this->attributes['role'] = null;
        }
        return $this;
    }

    public function get_tabs()
    {
        return $this->has_class('nav-tabs');
    }

    public function add_pane()
    {
        $pane = html::tab_pane($this->last_child()->href);
        $pane->parent = $this;
        $this->panes[] = $pane;
        return $this;
    }

    public function add($child)
    {
        parent::add($child);
        if($this->tabs() === true)
        {
            $this->add_pane();
        }
        return $this;
    }

    public function first_pane()
    {
        if(count($this->panes) === 0)
        {
            return null;
        }
        return $this->panes[0];
    }

    public function last_pane()
    {
        if(count($this->panes) === 0)
        {
            return null;
        }
        return $this->panes[count($this->panes) - 1];
    }

    public function render_panes($force = false)
    {
        $html = '';
        $is_forced = ($this->post_render_tabs === true || $force === true);
        if($is_forced === true && count($this->panes) > 0 && $this->get_tabs() === true)
        {
            $html .= '<div class="tab-content">';
            foreach($this->panes as $pane)
            {
                $html .= $pane->render();
            }
            $html .= '</div>';
        }
        return $html;
    }

    public function post_render()
    {
        $html = '';
        $html .= $this->render_panes();
        $html .= parent::post_render();
        return $html;
    }
}
