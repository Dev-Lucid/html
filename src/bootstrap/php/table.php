<?php

namespace DevLucid;

if(class_exists('\DevLucid\base_table') === false)
{
    include(__DIR__.'/../../base/php/table.php');
}

class bootstrap_table extends base_table
{
    use trait_bootstrap_sizeable;
    public $_bootstrap_size_prefix = 'table';
    public $_bootstrap_size_allowed = ['sm'];

    public function init()
    {
        $this->add_class('table');
        $this->responsive = true;
        $this->hover = true;
        parent::init();
    }

    public function set_inverse($val)
    {
        html::error_boolean($this, 'inverse', $val);
        return $this->toggle_class('table-inverse', $val);
    }

    public function get_inverse()
    {
        return $this->has_class('table-inverse');
    }

    public function set_striped($val)
    {
        html::error_boolean($this, 'striped', $val);
        return $this->toggle_class('table-striped', $val);
    }

    public function get_striped()
    {
        return $this->has_class('table-striped');
    }

    public function set_bordered($val)
    {
        html::error_boolean($this, 'bordered', $val);
        return $this->toggle_class('table-bordered', $val);
    }

    public function get_bordered()
    {
        return $this->has_class('table-bordered');
    }

    public function set_hover($val)
    {
        html::error_boolean($this, 'hover', $val);
        return $this->toggle_class('table-hover', $val);
    }

    public function get_hover()
    {
        return $this->has_class('table-hover');
    }

    public function set_responsive($val)
    {
        if($val === true)
        {
            $this->pre_html  .= '<div class="table-responsive">';
            $this->post_html .= '</div>';
        }

        return $this;
    }

    public function get_responsive()
    {
        return (strpos($this->pre_html, '<div class="table-responsive">') !== false);
    }
}
