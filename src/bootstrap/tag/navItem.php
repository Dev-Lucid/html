<?php
namespace Lucid\Html\Bootstrap\Tag;

class navItem extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Gridable;

    public $tag = 'li';

    public function init()
    {
        parent::init();
        $this->addClass('nav-item');
    }
}
