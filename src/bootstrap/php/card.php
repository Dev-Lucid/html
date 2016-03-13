<?php
namespace Devlucid;

class bootstrap_card extends base_tag
{
    public $tag = 'div';
    use trait_bootstrap_gridable;

    public function init()
    {
        parent::init();
        $this->add_class('card');
    }

    public function get_header()
    {
        if(count($this->children) == 0)
        {
            $this->add(html::card_header());
            return $this->last_child();
        }
        else if($this->children[0]->has_class('card-header') === false)
        {
            $this->prepend(html::card_header());
            return $this->first_child();
        }
        return $this->children[0];
    }

    public function set_header($value)
    {
        $header = $this->get_header();
        $header->add($value);
        return $this;
    }

    public function get_footer()
    {
        if(count($this->children) == 0)
        {
            $this->add(html::card_footer());
            return $this->last_child();
        }
        else if($this->last_child()->has_class('card-footer') === false)
        {
            $this->add(html::card_footer());
            return $this->last_child();
        }
        return $this->last_child();
    }

    public function set_footer($value)
    {
        $footer = $this->get_footer();
        $footer->add($value);
        return $this;
    }

    public function get_block()
    {
        foreach($this->children as $child)
        {
            if($child->has_class('card-block'))
            {
                return $child;
            }
        }
        $this->add(html::card_block());
        return $this->last_child();
    }

    public function set_block($value)
    {
        $block = $this->get_block();
        $block->add($value);
        return $this;
    }

    public function pre_render()
    {
        for($i=0; $i<count($this->children); $i++)
        {
            $child = $this->children[$i];
            if($child->tag == 'img')
            {
                if($i === 0)
                {
                    $child->add_class('card-img-top');
                }
                else if(($i + 1) === count($this->children))
                {
                    $child->add_class('card-img-bottom');
                }
            }
            else if (in_array($child->tag,['h3','h4']))
            {
                $this->add_class('block');
                $child->add_class('card-title');
            }
            else if($child->tag == 'p')
            {
                $this->add_class('block');
                $child->add_class('card-text');
            }
            else if($child->tag == 'ul')
            {
                $child->add_class('list-group-flush');
            }
            else if($child->tag == 'blockquote')
            {
                $child->add_class('card-blockquote');
            }
            else if($child->tag == 'a' && $child->has_class('btn') === false)
            {
                $child->add_class('card-link');
            }
        }
        return parent::pre_render();
    }
}
