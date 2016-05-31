<?php    

    public function setFluid($val)
    {
        if ($val === true) {
            $this->addClass('container-fluid');
        } elseif ($val === false) {
            $this->removeClass('container-fluid');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'fluid', $val, ['true', 'false']);
        }
        return $this;
    }
?>