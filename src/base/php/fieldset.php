<?php

namespace DevLucid;

class base_fieldset extends BaseTag
{
    private $legend = null;

    function checkValidChild($child)
    {
        if ($child->tag == 'legend') {
            throw new \Exception(html::errorChildTag($child->tag, ['tr'], null));
        }
    }

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
