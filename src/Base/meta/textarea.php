<?php 
    public function setValue($newValue) : \Lucid\Html\TagInterface
    {
        if (count($this->children) === 0) {
            $this->add($newValue);
        } else {
            $this->children = [];
            $this->add($newValue);
        }
        return $this;
    }

    public function getValue()
    {
        if (count($this->children) === 0) {
            return '';
        } else {
            return $this->renderChildren();
        }
    }
?>