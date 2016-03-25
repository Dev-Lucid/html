<?php

namespace Lucid\Html\Bootstrap\Tag;

class row extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('row');
    }
}
