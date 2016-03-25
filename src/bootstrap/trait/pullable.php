<?php
namespace Lucid\Html\Bootstrap\Trait;

trait Pullable
{
    public function getPull()
    {
        $pull = null;
        if($this->hasClass('pull-left') === true)
        {
            $pull = 'left';
        }
        if($this->hasClass('pull-right') === true)
        {
            $pull = 'right';
        }
        return $pull;
    }

    public function setPull($newPull)
    {
        if ($newPull !== 'left' && $newPull !== 'right' && is_null($newPull) === false) {
            throw new \Exception('->pull may only be set to left, right, or null');
        }

        if (is_null($newPull) === true) {
            $this->removeClass('pull-left')->removeClass('pull-right');
        } else {
            $this->addClass('pull-'.$newPull);
        }
        return $this;
    }
}