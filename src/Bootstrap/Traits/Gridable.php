<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Gridable
{
    protected $gridColumnNames = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    public function setGrid(array $val)
    {
        $this->attributes['grid'] = $val;
        return $this;
    }
    
    public function getGrid() : array
    {
        if (isset($this->attributes['grid']) === false || is_null($this->attributes['grid']) === true) {
            return [];
        }
        return $this->attributes['grid'];
    }
    
    public function renderGrid()
    {        
        if (is_array($this->attributes['grid']) === true) {
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($this->attributes['grid'][$i]) === true && is_null($this->attributes['grid'][$i]) === false) {
                    $this->addClass('col-'.$this->gridColumnNames[$i].'-'.$this->attributes['grid'][$i]);
                }
            }
        }
        return null;
    }
}
