<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Pullable
{
    public function setPull($val)
    {
        $this->removeClass(['pull-left', 'pull-right']);
        if ($val == 'left') {
            $this->addClass('pull-left');
        } elseif ($val == 'right') {
            $this->addClass('pull-right');
        } 
        return $this;
    }
}
