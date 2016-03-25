<?php
namespace Lucid\Html\Base\Tags;

class Submit extends \Lucid\Html\Tag
{
    use \Lucid\Html\Base\Traits\Disableable;

    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['text',];

    public function init()
    {
        parent::init();
        $this->allowedAttributes[] = 'type';
        $this->type = 'submit';
        $this->tag = 'button';
    }

    public function set_text($value)
    {
        $this->add($value);
        return $this;
    }

    public function get_text()
    {
        return $this->renderChildren();
    }
}
