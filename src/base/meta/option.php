
    public function setSelected($val)
    {
        if (is_null($this->parent) === false) {
            foreach ($this->parent->children as $child) {
                unset($child->attributes['selected']);
            }
        }
        $this->attributes['selected'] = ($val === true)?'selected':null;
        return $this;
    }

    public function getSelected()
    {
        return (isset($this->attributes['selected']) === true && $this->attributes['selected'] == 'selected');
    }
