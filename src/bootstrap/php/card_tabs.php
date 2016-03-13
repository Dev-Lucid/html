<?php
namespace Devlucid;

if(class_exists('\\DevLucid\\bootstrap_nav') === false)
{
    include(__DIR__.'/nav.php');
}

class bootstrap_card_tabs extends bootstrap_nav
{
    public $post_render_tabs = false;
    protected $_footer = null;

    public function init()
    {
        parent::init();
        $this->tabs(true);
    }

    public function pre_render()
    {
        $html = parent::pre_render();
        $this->tabs(true);
        $this->add_class('card-header-tabs');
        $this->add_class('pull-xs-left');

        return '<div class="card text-xs-left"><div class="card-header">'.$html;
    }

    public function post_render()
    {
        $html = parent::post_render();
        $html .= '</div><div class="card-block">';
        $html .= $this->render_panes(true);
        $html .= '</div>';

        if(is_null($this->footer) === false)
        {
            $html .= $this->_footer->render();
        }

        $html .= '</div>';
        return $html;
    }

    public function add_tab($label, $id=null)
    {
        if(is_null($id) === true)
        {
            $id = uniqid('tab');
        }
        $this->add(html::nav_anchor($id, $label));
        return $this->last_pane();
    }

    public function get_footer()
    {
        if(is_null($this->_footer) === true)
        {
            $this->_footer = html::card_footer();
        }

        return $this->_footer;
    }

    public function set_footer($value)
    {
        $this->get_footer()->add($value);
        return $this;
    }
}
