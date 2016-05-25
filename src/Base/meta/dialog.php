
    public function setOpen($newValue) 
    {
        if ($val !== true && $val !== false) {
            throw new \Exception('Attribute open only accepts values true or false.');
        }
        $this->attributes['open'] = $val;
        return $this;
    }

    public function renderOpen()
    {
        $val = ($this->attributes['open'] === true)?'open':null;
        return $val;
    }
