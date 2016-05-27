<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Pullable
{
    public function setPull($val)
    {
        if (isset($this->attributes['class']) === false) {
            $this->attributes['class'] = [];
        }
        
        $newClasses = [];
        foreach ($this->attributes['class'] as $class) {
            if (strpos($class, 'pull-') !== 0) {
                $newClasses[] = $class;
            }
        }
        
        $sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
        if (is_array($val) === true) {
            foreach ($val as $index=>$pullPerSize) {
                if (is_null($pullPerSize) === false) {
                    $newClasses[] = 'pull-'.$sizes[$index].'-'.$pullPerSize;
                }
            }
        } else {
            foreach ($sizes as $size) {
                $newClasses[] = 'pull-'.$size.'-'.$val;
            }
        }
        
        $this->attributes['class'] = $newClasses;
        
        return $this;
    }
}
