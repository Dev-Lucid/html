<?php

namespace DevLucid;

class bootstrap_anchor extends base_anchor{    use trait_bootstrap_pullable, trait_bootstrap_activable; }
class bootstrap_h1 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h2 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h3 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h4 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h5 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h6 extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_h7 extends base_tag{    use trait_bootstrap_pullable; }

class bootstrap_div extends base_tag{   use trait_bootstrap_pullable; }
class bootstrap_span extends base_tag{  use trait_bootstrap_pullable; }
class bootstrap_ul extends base_tag{    use trait_bootstrap_pullable; }
class bootstrap_image extends base_tag{ use trait_bootstrap_pullable; }


class bootstrap_anchor_button extends bootstrap_anchor
{
    use trait_bootstrap_modifiable, trait_bootstrap_sizeable;
    public $_bootstrap_modifier_allowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $_bootstrap_modifier_prefix  = 'btn';
    public $_bootstrap_size_prefix = 'btn';
    public $_bootstrap_size_allowed = ['sm','lg',];

    public $parameters = ['href','child','modifier',];
    public function init()
    {
        parent::init();
        $this->add_class('btn');
        $this->modifier('primary');
    }
}


class bootstrap_tr extends base_tr
{
    use trait_bootstrap_modifiable;
    public $_bootstrap_modifier_allowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $_bootstrap_modifier_prefix = 'table';
}

class bootstrap_th extends base_th
{
    use trait_bootstrap_modifiable;
    public $_bootstrap_modifier_allowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $_bootstrap_modifier_prefix = 'table';
}

class bootstrap_td extends base_td
{
    use trait_bootstrap_modifiable;
    public $_bootstrap_modifier_allowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $_bootstrap_modifier_prefix = 'table';
}

class bootstrap_input_group extends base_tag
{
    public $tag = 'div';
    use trait_bootstrap_sizeable;
    public $_bootstrap_size_prefix  = 'form-control';
    public $_bootstrap_size_allowed = ['sm', 'lg', ];

    public function init()
    {
        parent::init();
        $this->add_class('input-group');
    }
}

class bootstrap_button_group extends base_tag
{
    use trait_bootstrap_pullable, trait_bootstrap_sizeable;
    public $tag = 'div';
    public $_bootstrap_size_prefix  = 'btn-group';
    public $_bootstrap_size_allowed = ['sm','lg'];
    public function init()
    {
        parent::init();
        $this->add_class('btn-group');
        $this->attributes['role'] = 'group';

    }

    function set_vertical($val)
    {
        html::error_boolean($this, 'vertical', $val);
        return $this->toggle_class('btn-group-vertical',$val);
    }

    function get_vertical()
    {
        return $this->has_class('btn-group-vertical');
    }
}

class button_toolbar extends base_tag
{
    use trait_bootstrap_pullable, trait_bootstrap_sizeable;
    public $tag = 'div';
    public $_bootstrap_size_prefix  = 'btn-group';
    public $_bootstrap_size_allowed = ['sm','lg'];
    public function init()
    {
        parent::init();
        $this->add_class('btn-toolbar');
        $this->attributes['role'] = 'toolbar';
    }
}

class bootstrap_nav_item extends base_tag
{
    public function init()
    {
        parent::init();
        $this->tag = 'li';
        $this->add_class('nav-item');
    }
}

class bootstrap_row extends base_tag
{
    use trait_bootstrap_gridable;

    public $tag = 'div';
    public function init()
    {
        parent::init();
        $this->add_class('row');

    }
}

class bootstrap_column extends base_tag
{
    public $tag = 'div';
    use trait_bootstrap_gridable;
}

class bootstrap_card_header extends base_tag
{
    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->add_class('card-header');
    }
}

class bootstrap_card_footer extends base_tag
{
    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->add_class('card-footer');
    }
}
