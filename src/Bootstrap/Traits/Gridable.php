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
    
    public function setOffset(array $val)
    {
        $this->attributes['offset'] = $val;
        return $this;
    }
    
    public function getOffset() : array
    {
        if (isset($this->attributes['offset']) === false || is_null($this->attributes['offset']) === true) {
            return [];
        }
        return $this->attributes['offset'];
    }
    
    public function renderOffset()
    {        
        if (is_array($this->attributes['offset']) === true) {
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($this->attributes['offset'][$i]) === true && is_null($this->attributes['offset'][$i]) === false) {
                    $this->addClass('offset-'.$this->gridColumnNames[$i].'-'.$this->attributes['offset'][$i]);
                }
            }
        }
        return null;
    }
    
    public function setGridPush(array $val)
    {
        $this->attributes['gridPush'] = $val;
        return $this;
    }
    
    public function getGridPush() : array
    {
        if (isset($this->attributes['gridPush']) === false || is_null($this->attributes['gridPush']) === true) {
            return [];
        }
        return $this->attributes['gridPush'];
    }
    
    public function renderGridPush()
    {        
        if (is_array($this->attributes['gridPush']) === true) {
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($this->attributes['gridPush'][$i]) === true && is_null($this->attributes['gridPush'][$i]) === false) {
                    $this->addClass('push-'.$this->gridColumnNames[$i].'-'.$this->attributes['gridPush'][$i]);
                }
            }
        }
        return null;
    }
    
    public function setGridPull(array $val)
    {
        $this->attributes['gridPull'] = $val;
        return $this;
    }
    
    public function getGridPull() : array
    {
        if (isset($this->attributes['gridPull']) === false || is_null($this->attributes['gridPull']) === true) {
            return [];
        }
        return $this->attributes['gridPull'];
    }
    
    public function renderGridPull()
    {        
        if (is_array($this->attributes['gridPull']) === true) {
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($this->attributes['gridPull'][$i]) === true && is_null($this->attributes['gridPull'][$i]) === false) {
                    $this->addClass('pull-'.$this->gridColumnNames[$i].'-'.$this->attributes['gridPull'][$i]);
                }
            }
        }
        return null;
    }
}
