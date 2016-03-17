<?php

namespace DevLucid\Tag;

class BaseButton extends BaseTag
{
    use BaseDisableableTrait;

    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['text','onclick','type',];

    public function init()
    {
        $this->type = 'button';
        parent::init();
    }

    public function setType($val)
    {
        \DevLucid\html::errorValues($this, 'type', $val,['button','submit']);
        $this->attributes['type'] = $val;
        return $this;
    }

    public function setText($value)
    {
        $this->add($value);
        return $this;
    }

    public function getText()
    {
        return $this->renderChildren();
    }
}
