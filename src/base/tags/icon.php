<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class Icon extends \Lucid\Html\Tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['icon',];
    public $allowChildren = false;

    public function init()
    {
        $this->tag = 'i';
        $this->addClass(html::$iconPrefix);
    }

    public function setIcon($val)
    {
        $this->addClass(html::$iconPrefix.'-'.$val);
    }
}
