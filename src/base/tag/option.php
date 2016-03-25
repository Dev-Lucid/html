<?php
namespace Lucid\Html\Base\Tag;

class Option extends \Lucid\Html\Tag
{
    public $parameters = ['value','child','selected',];
    public function init()
    {
        $this->allowedAttributes[] = 'selected';
        $this->allowedAttributes[] = 'value';
    }

    public function setSelected($val)
    {
        $this->attributes['selected'] = ($val === true)?'selected':null;
        return $this;
    }

    public function getSelected()
    {
        return (isset($this->attributes['selected']) === true && $this->attributes['selected'] == 'selected');
    }
}
