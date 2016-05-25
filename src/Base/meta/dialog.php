<?php
    public function setOpen($newValue) : \Lucid\Html\TagInterface
    {
        if ($val !== true && $val !== false) {
            throw new \Exception('Attribute open only accepts values true or false.');
        }
        $this->attributes['open'] = $val;
        return $this;
    }

    public function renderOpen() : string
    {
        $val = ($this->attributes['open'] === true)?'open':null;
        return $val;
    }
?>