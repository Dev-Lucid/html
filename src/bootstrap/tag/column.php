<?php

namespace Lucid\Html\Bootstrap\Tag;

class column extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        #$this->addClass('col');
    }
}
