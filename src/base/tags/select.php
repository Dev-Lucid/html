<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class Select extends \Lucid\Html\Tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['name', 'value', 'data', 'onchange',];

    public $value = null;
    public $data  = null;

    public function preRender()
    {
        if (is_null($this->data) === false) {
            foreach ($this->data as $option) {
                $value = '';
                $label = '';

                if (isset($option['label']) === true) {
                    $value = $option['value'];
                    $label = $option['label'];
                } elseif (isset($option[1]) === true) {
                    $value = $option[0];
                    $label = $option[1];
                }
                settype($this->value,'string');
                settype($value,'string');
                $this->add(html::option($value, $label, ($this->value == $value)));
            }
        }
        return parent::preRender();
    }
}
