<?php
namespace Devlucid\Tag;

class BootstrapCardBlock extends BaseTag
{
    public $tag = 'div';

    public function init()
    {
        $this->addClass('card-block');
        parent::init();
    }

    public function preRender()
    {
        for ($i=0; $i<count($this->children); $i++) {
            $child = $this->children[$i];

            if (is_object($child) === true) {
                if (in_array($child->tag,['h3','h4']) === true) {
                    $child->addClass('card-title');
                } elseif($child->tag == 'p') {
                    $child->addClass('card-text');
                }
            }
        }
        return parent::preRender();
    }
}
