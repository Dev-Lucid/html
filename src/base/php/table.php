<?php

namespace DevLucid;

class base_table extends base_tag
{
    private $_thead = null;
    private $_tfoot = null;

    public $pre_children_html  = '<tbody>';
    public $post_children_html = '</tbody>';

    function init()
    {
        $this->allowed_attributes[] = 'cellspacing';
        $this->allowed_attributes[] = 'cellpadding';
        $this->allowed_attributes[] = 'border';
        $this->allowed_attributes[] = 'width';
    }

    function check_valid_child($child)
    {
        html::error_child_tag($this, $child->tag, ['tr'], null);
    }

    function pre_children()
    {
        if(is_null($this->_thead) === false)
        {
            if (count($this->_thead->children) > 0)
            {
                return $this->_thead->render();
            }
        }
        return '';
    }

    function post_children()
    {
        if(is_null($this->_tfoot) === false)
        {
            if (count($this->_tfoot->children) > 0)
            {
                return $this->_tfoot->render();
            }
        }
        return '';
    }

    public function get_head()
    {
        if(is_null($this->_thead))
        {
            $this->_thead = html::thead();
        }
        return $this->_thead;
    }

    private function _get_colspan()
    {
        if(count($this->children) === 0)
        {
            return 1;
        }
        else
        {
            return count($this->children[0]->children);
        }
    }

    public function set_head($text)
    {
        $head = $this->head();
        $head->children = [];
        $head->add(html::th()->colspan($this->_get_colspan())->add($text));
        return $this;
    }

    public function get_foot()
    {
        if(is_null($this->_tfoot))
        {
            $this->_tfoot = html::tfoot();
        }
        return $this->_tfoot;
    }

    public function set_foot($text)
    {
        $foot = $this->foot();
        $foot->children = [];
        $foot->add(html::td()->colspan($this->_get_colspan())->add($text));
        return $this;
    }

    public function row()
    {
        $this->add(html::tr());
        return $this->last_child();
    }
}
