<?php
namespace Devlucid;

class bootstrap_input extends base_input
{
    public $pre_addon  = null;
    public $post_addon = null;

    use trait_bootstrap_sizeable, trait_bootstrap_pullable;
    public $_bootstrap_size_prefix  = 'form-control';
    public $_bootstrap_size_allowed = ['sm', 'lg', ];

    public function pre_render()
    {
        switch($this->type)
        {
            case 'radio':
            case 'checkbox':
                break;
            case 'file':
                $this->add_class('form-control-file');
                break;
            default:
                $this->add_class('form-control');
                break;
        }

        if(is_null($this->pre_addon) === false || is_null($this->post_addon) === false)
        {
            $class = 'input-group';
            foreach($this->_bootstrap_size_allowed as $size)
            {
                if($this->has_class($this->_bootstrap_size_prefix.'-'.$size))
                {
                    $this->remove_class($this->_bootstrap_size_prefix.'-'.$size);
                    $class .= ' input-group-'.$size;
                }
            }
            if($this->has_class('pull-right'))
            {
                $this->remove_class('pull-right');
                $class .= ' pull-right';
            }
            if($this->has_class('pull-left'))
            {
                $this->remove_class('pull-left');
                $class .= ' pull-left';
            }

            $this->pre_html .= '<div class="'.$class.'">';
            $this->post_html .= '</div>';

            if(is_null($this->pre_addon) === false)
            {
                $this->pre_html .= '<span class="input-group-addon">'.$this->pre_addon.'</span>';
            }
            if(is_null($this->post_addon) === false)
            {
                $this->post_html = '<span class="input-group-addon">'.$this->post_addon.'</span>'.$this->post_html;

            }
        }
        return parent::pre_render();
    }

    public function set_type($type)
    {
        parent::set_type($type);

        if ($type == 'date') {
            $this->attributes['type'] = 'text';
            #$this->post_addon = html::icon('calendar');
            $this->attributes['onfocus'] = "window.jQuery(this).datetimepicker({mask:'9999-12-39 23:59', format:'Y-m-d H:i'});window.jQuery(this).datetimepicker('toggle');";
        }

        return $this;
    }


}
