<?php
    public function preRender() : string
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
                $this->add($this->build('option', $value, $label, ($this->value == $value)));
            }
        }
        return parent::preRender();
    }
    
    public function setValue($newValue) : \Lucid\Html\TagInterface
    {
        $this->value = $newValue;
        if (count($this->children) > 0) {
            for ($i=0; $i<count($this->children); $i++) {
                $this->children[$i]->setSelected(($this->children[$i]->get('value') == $newValue));
            }
        }
        return $this;
    }
?>