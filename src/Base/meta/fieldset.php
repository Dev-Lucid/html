<?php
    public function getLegend() : \Lucid\Html\TagInterface
    {
        if (is_null($this->legend) === true) {
            $this->legend = static::build('legend');
        }
        return $this->legend;
    }
    
    public function setLegend($newValue) : \Lucid\Html\TagInterface
    {
        $legend = $this->get('legend');
        $legend->children = [];
        $legend->add($newValue);
        return $this;
    }
    
    public function preChildren() : string
    {
        if (is_null($this->legend) === false) {
            $this->preChildrenHtml .= $this->legend->render();
        }
        return parent::preChildren();
    }
?>