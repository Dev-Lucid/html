<?php
namespace Lucid\Html\Base\Tag;

class Fieldset extends \Lucid\Html\Tag
{
    private $legend = null;

    function preChildren()
    {
        if (is_null($this->legend) === false) {
            if (count($this->legend->children) > 0) {
                return $this->legend->render();
            }
        }
        return '';
    }

    public function getlegend()
    {
        if (is_null($this->legend) === true){
            $this->legend = \DevLucid\html::legend();
        }
        return $this->legend;
    }

    public function setlegend($text)
    {
        $legend = $this->legend();
        $legend->children = [];
        $legend->add($text);
        return $this;
    }
}
