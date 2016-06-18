<?php
    public function preRender() : string
    {
        if ($this->useCheckableLayout === true) {
            $this->addClass('form-group');
            $this->preChildrenHtml .= '<div class="'.$this->checkableLayoutClass.'">';
            $this->postChildrenHtml = '</div>'. $this->postChildrenHtml;
            
            if ($this->useRowLayout === true) {
                $this->addClass('row');
                $this->groupLabel->addClass('col-'.$this->gridSizeMinimum.'-'.$this->gridSizeLabel);
                $this->groupLabel->addClass('col-form-label');
                $this->preChildrenHtml .= '<div class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeField.'">';
                $this->postChildrenHtml = '</div>' . $this->postChildrenHtml;
                foreach ($this->children as $child) {
                    $child->preHtml = '<div class="form-check"><label class="form-check-label">' . $child->preHtml;
                    $child->postHtml .= '</label></div>';
                }
            } else {
                foreach ($this->children as $child) {
                    $child->preHtml .= '<label>';
                    $child->postHtml = '</label>'.$child->postHtml;
                }
            }
        } else {
            $this->addClass('form-group');
            if ($this->useRowLayout === true) {
                $this->addClass('row');
                $this->groupLabel->addClass('col-'.$this->gridSizeMinimum.'-'.$this->gridSizeLabel);
                $this->groupLabel->addClass('col-form-label');
                
                $first = true;
                foreach ($this->children as $child) {
                    if ($first === true) {
                        $child->preHtml .= '<div class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeField.'">';
                        $first = false;
                    } else {
                        $child->preHtml .= '<div class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeField.' col-offset-'.$this->gridSizeMinimum.'-'.$this->gridSizeLabel.'">';
                    }
                    $child->postHtml = '</div>' . $child->postHtml;
                }
            } else {
                # nothing to do in this case!
            }
            
        }
         
        if (is_null($this->groupLabel) === false) {
            $this->preChildrenHtml = $this->groupLabel->render() . $this->preChildrenHtml;
        }
       
        return parent::preRender();
    }
    
    public function setUseRowLayout($val) : \Lucid\Html\TagInterface
    {
        if ($val === true || $val === false) {
            $this->useRowLayout = $val;
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'useRowLayout', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function setProperties(array $properties = []) : \Lucid\Html\TagInterface
	{
        $inputType = (isset($properties[0]) === true)?$properties[0]:null;
        if ($inputType == 'inputCheckbox') { 
    		$groupLabel= (isset($properties[1]) === true)?$properties[1]:null;
    		$field     = (isset($properties[2]) === true)?$properties[2]:null;
    		$checked   = (isset($properties[3]) === true)?$properties[3]:null;
    		$label     = (isset($properties[4]) === true)?$properties[4]:null;
    		$help      = (isset($properties[5]) === true)?$properties[5]:null;
        } elseif ($inputType == 'inputRadio') {
    		$groupLabel= (isset($properties[1]) === true)?$properties[1]:null;
    		$field     = (isset($properties[2]) === true)?$properties[2]:null;
    		$value     = (isset($properties[3]) === true)?$properties[3]:null;
    		$checked   = (isset($properties[4]) === true)?$properties[4]:null;
    		$label     = (isset($properties[5]) === true)?$properties[5]:null;
    		$help      = (isset($properties[6]) === true)?$properties[6]:null;
        } else {
    		$groupLabel= (isset($properties[1]) === true)?$properties[1]:null;
    		$field     = (isset($properties[2]) === true)?$properties[2]:null;
    		$value     = (isset($properties[3]) === true)?$properties[3]:null;
    		$help      = (isset($properties[4]) === true)?$properties[4]:null;
        }
		
        
        if (is_null($groupLabel) === false) {
            if ($groupLabel == '') {
                $groupLabel = '&nbsp;';
            }
            $this->groupLabel = $this->build('label', $field, $groupLabel);
        }
        if (is_null($field) === false) {
            if ($inputType == 'inputCheckbox') {
    		    $this->add($this->build($inputType, $field, $checked, $label));
            } else if ($inputType == 'inputRadio') {
    		    $this->add($this->build($inputType, $field, $value, $checked, $label));
            } else {
    		    $this->add($this->build($inputType, $field, $value));
            }
		}
		if (is_null($help) === false) {
            $this->children[0]->postHtml .= '<br />'.$this->build('inputHelp', $help);
		}
		
		return $this;
	}
    
    public function getGroupLabel() : \Lucid\Html\TagInterface
	{
		return $this->groupLabel;
	}
    
    public function setGridSizeMinimum($val)
    {
        $this->gridSizeMinimum = $val;
        return $this;
    }
    
    public function setGridSizeField($val)
    {
        $this->gridSizeField = $val;
        return $this;
    }
    
    public function setGridSizeLabel($val)
    {
        $this->gridSizeLabel = $val;
        return $this;
    }
    
    public function add($child) : \Lucid\Html\TagInterface
    {
        if (is_object($child) === false) {
            parent::add($child);
        } else {
            if ($child->tag == 'input' && $child->get('type') == 'checkbox') {
                $this->useCheckableLayout = true;
                $this->checkableLayoutClass = 'checkbox';
                parent::add($child);
            } else if ($child->tag == 'input' && $child->get('type') == 'radio') {
                $this->useCheckableLayout = true;
                $this->checkableLayoutClass = 'radio';
                parent::add($child);
            } else {
                parent::add($child);
            }
        }
        return $this;
    }
?>