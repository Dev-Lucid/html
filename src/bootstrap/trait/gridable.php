<?php
namespace Lucid\Html\Bootstrap\Trait;

trait Gridable
{
    public $bootstrapGridSizeNames = ['xs','sm','md','lg','xl'];
    public function grid($columns)
    {
        $cols = [];
        for ($i=0; $i<count($columns); $i++){
            $cols[$i] = \DevLucid\html::column();
            $cols[$i]->gridSize($columns[$i]);
            $this->add($cols[$i]);
        }
        return $cols;
    }
    public function gridSize($sizes)
    {
        $this->gridApplySizes($sizes, '');
        return $this;
    }

    public function gridOffset($sizes)
    {
        $this->gridApplySizes($sizes, 'offset-');
        return $this;
    }

    public function gridPush($sizes)
    {
        $this->gridApplySizes($sizes, 'push-');
        return $this;
    }

    public function gridPull($sizes)
    {
        $this->gridApplySizes($sizes, 'pull-');
        return $this;
    }

    private function gridApplySizes($sizes, $modifier = '')
    {
        for ($i=0; $i<count($this->bootstrapGridSizeNames); $i++) {
            if (isset($sizes[$i]) === true and is_null($sizes[$i]) === false) {
                $this->addClass('col-'.$this->bootstrapGridSizeNames[$i].'-'.$modifier.$sizes[$i]);
            }
        }
        return $this;
    }
}