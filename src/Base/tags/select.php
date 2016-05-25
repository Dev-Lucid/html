<?php
namespace Lucid\Html\Base\Tags;

class select extends \Lucid\Html\Tag
{
	public $tag = 'select';
	public $parameters = ['name', 'value', 'data', 'onchange'];
	public $data = null;
	public $value = null;

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['option', 'optgroup']) !== true) {
			throw new \Exception('Invalid child. Tag select only allows these tags as children: option, optgroup');
		}
		return true;
	}
    
    public function preRender()
    {
        if (count($this->children) > 0) {
            foreach ($this->children as $child) {
                $child->setSelected(($child->get('value') == $this->value));
            }
        }
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
                settype($this->value, 'string');
                settype($value, 'string');
                $this->add(\Lucid\Html\Html::build('option', $value, $label, ($this->value == $value)));
            }
        }
        return parent::preRender();
    }
    
    public function setValue($newValue)
    {
        $this->value = $newValue;
        if (count($this->children) > 0) {
            for ($i=0; $i<count($this->children); $i++) {
                $this->children[$i]->setSelected(($this->children[$i]->get('value') == $newValue));
            }
        }
        return $this;
    }
    }
