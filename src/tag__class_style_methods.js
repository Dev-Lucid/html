lucid.html.tag.prototype.setClass=function(newClass){
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    this.attributes['class'].push(newClass);
    return this;
};

lucid.html.tag.prototype.renderClass=function() {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    return this.attributes['class'].join(' ');
};

lucid.html.tag.prototype.hasClass=function(classToCheck) {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
        return false;
    }
    return (this.attributes['class'].indexOf(classToCheck) >= 0);
};

lucid.html.tag.prototype.addClass=function(classToAdd) {
    if(this.hasClass(classToAdd) === false) {
        this.attributes['class'].push(classToAdd);
    }
    return this;
};

lucid.html.tag.prototype.removeClass=function(classToRemove) {
    if (this.hasClass(classToRemove) === true){
        var newClasses = [];
        for(var i=0; i<this.attributes['class'].length; i++){
            if (this.attributes['class'][i] != classToRemove) {
                newClasses.push(classToRemove);
            }
        }
        this.attributes['class'] = newClasses;
    }

    return this;
};

lucid.html.tag.prototype.toggleClass=function(classToToggle, newState) {
    if(typeof(newState) == 'undefined' || newState === null){
        if (this.hasClass(classToToggle) === true) {
            this.removeClass(classToToggle);
        } else {
            this.addClass(classToToggle);
        }
    } else {
        if(newState === true) {
            this.addClass(classToToggle);
        } else {
            this.removeClass(classToToggle);
        }
    }
    return this;
};

/*
lucid.html.tag.prototype.setStyle=function($new_style) {
    if(isset($this->attributes['style']) === false || is_array($this->attributes['style']) === false)
    {
        $this->attributes['style'] = [];
    }

    $new_style_list = explode(';', trim($new_style));
    foreach($new_style_list as $new_style_pair)
    {
        if($new_style_pair != '')
        {
            list($key, $value) = explode(':', $new_style_pair);
            $key = strtolower(trim($key));
            $value = trim($value);
            $this->attributes['style'][$key] = $value;
        }
    }
    return $this;
}

lucid.html.tag.prototype.renderStyle=function() {
    $css = '';
    foreach($this->attributes['style'] as $key=>$value)
    {
        if(is_null($value) === false)
        {
            $css .= $key.':'.$value.';';
        }
    }
    return $css;
};

lucid.html.tag.prototype.setHidden=function($val) {
    if ($val !== true && $val !== false)
    {
        throw new \Exception('Attribute hidden only accepts values true or false.');
    }
    $this->attributes['hidden'] = $val;
    return $this;
};

lucid.html.tag.prototype.renderHidden() {
    $val = ($this->attributes['hidden'] === true)?'hidden':null;
    return $val;
};
*/
