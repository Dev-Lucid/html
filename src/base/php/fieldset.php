<?php

namespace DevLucid;

class base_fieldset extends base_tag
{
    private $_legend = null;

    function check_valid_child($child)
    {
        if($child->tag == 'legend')
        {
            throw new \Exception(html::error_child_tag($child->tag, ['tr'], null));
        }
    }

    function pre_children()
    {
        if(is_null($this->_legend) === false)
        {
            if (count($this->_legend->children) > 0)
            {
                return $this->_legend->render();
            }
        }
        return '';
    }

    public function get_legend()
    {
        if(is_null($this->_legend))
        {
            $this->_legend = html::legend();
        }
        return $this->_legend;
    }

    public function set_legend($text)
    {
        $legend = $this->legend();
        $legend->children = [];
        $legend->add($text);
        return $this;
    }
}
