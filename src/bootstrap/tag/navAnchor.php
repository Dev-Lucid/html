<?php

namespace Lucid\Html\Bootstrap\Tag;

class NavAnchor extends \DevLucid\Base\Tags\Anchor
{
    use \Lucid\Html\Bootstrap\Trait\Activable;

    public function init()
    {
        parent::init();
        $this->addClass('nav-link');
        $this->allowedAttributes[] = 'data_target';
        $this->parameters[] = 'data_target';
    }

    public function preRender()
    {
        $parent = $this->parent;
        if (is_null($parent) === false) {
            if($parent->hasClass('nav-tabs')) {
                $href = $this->href;
                $this->href = null;
                $this->data_target = '#'.$href;
            }
        }
        return parent::preRender();
    }
}
