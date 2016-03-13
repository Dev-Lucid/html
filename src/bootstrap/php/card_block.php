<?php
namespace Devlucid;

class bootstrap_card_block extends base_tag
{
    public $tag = 'div';

    public function init()
    {
        $this->add_class('card-block');
        parent::init();
    }

    public function pre_render()
    {
        for($i=0; $i<count($this->children); $i++)
        {
            $child = $this->children[$i];

            if(is_object($child))
            {
                if (in_array($child->tag,['h3','h4']))
                {
                    $child->add_class('card-title');
                }
                else if($child->tag == 'p')
                {
                    $child->add_class('card-text');
                }
            }
        }
        return parent::pre_render();
    }
}
