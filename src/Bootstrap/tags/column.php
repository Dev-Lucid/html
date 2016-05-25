<?php
namespace Lucid\Html\Bootstrap\Tags;

class column extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Traits\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        #$this->addClass('col');
    }
}
