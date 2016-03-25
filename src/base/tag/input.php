<?php

namespace Lucid\Html\Base\Tag;

class Input extends \Lucid\Html\Tag
{
    use \Lucid\Html\Base\Trait\Checkable, \Lucid\Html\Base\Trait\Disableable;

    public $allowQuickClose = true;
    public $allowChildren    = false;

    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['type', null, null, null, null, null, null,];
    public $parametersByType = [
        'date'        => ['type', 'name', 'value', ],
        'datetime'        => ['type', 'name', 'value', ],
        'datetime-local'        => ['type', 'name', 'value', ],
        'text'        => ['type', 'name', 'value', 'placeholder', ],
        'email'       => ['type', 'name', 'value', 'placeholder',],
        'password'    => ['type', 'name', 'placeholder',],
        'checkbox'    => ['type', 'name', 'checked', 'postHtml',],
        'radio'       => ['type', 'name', 'value', 'checked',],
        'button'      => ['type', 'value', 'onclick',],
        'submit'      => ['type', 'value',],
        'hidden'      => ['type', 'name', 'value',],
    ];
    public $allowedAttributesByType = [
        'date'        => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress', ],
        'datetime-local'=> ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress', ],
        'text'        => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress', ],
        'email'       => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress',],
        'password'    => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress',],
        'checkbox'    => ['onclick',],
        'radio'       => ['onclick',],
        'button'      => ['onclick',],
        'submit'      => ['onclick',],
        'hidden'      => [],
    ];

    public function init()
    {
        $this->allowedAttributes[] = 'type';
        $this->allowedAttributes[] = 'value';
        $this->allowedAttributes[] = 'disabled';
        $this->allowedAttributes[] = 'placeholder';
        $this->allowedAttributes[] = 'disabled';
    }

    public function setType($val)
    {
        $allowedTypes = array_keys($this->parametersByType);
        if(in_array($val, $allowedTypes) === false)
        {
            throw new \Exception('Input class does not support type '.$val.'; only types '.implode(', ',$allowedTypes));
        }
        $this->attributes['type'] = $val;
        $this->parameters = $this->parametersByType[$val];
        $this->allowedAttributes = array_merge($this->allowedAttributes, $this->allowedAttributesByType[$val]);
    }
}
