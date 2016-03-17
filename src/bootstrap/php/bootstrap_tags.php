<?php

namespace DevLucid\Tag;

class BootstrapAnchor extends BaseAnchor{    use BootstrapPullableTrait, BootstrapActivableTrait; }
class BootstrapH1 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH2 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH3 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH4 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH5 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH6 extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapH7 extends BaseTag{    use BootstrapPullableTrait; }

class BootstrapDiv extends BaseTag{   use BootstrapPullableTrait; }
class BootstrapSpan extends BaseTag{  use BootstrapPullableTrait; }
class BootstrapUl extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapOl extends BaseTag{    use BootstrapPullableTrait; }
class BootstrapImage extends BaseTag{ use BootstrapPullableTrait; }


class BootstrapAnchorButton extends BootstrapAnchor
{
    use BootstrapModifiableTrait, BootstrapSizeableTrait;

    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', ];
    public $bootstrapModifierPrefix  = 'btn';
    public $bootstrapSizePrefix = 'btn';
    public $bootstrapSizesAllowed = ['sm','lg',];

    public $parameters = ['href','child','modifier',];

    public function init()
    {
        parent::init();
        $this->addClass('btn');
        $this->modifier('primary');
    }
}


class BootstrapTr extends BaseTr
{
    use BootstrapModifiableTrait;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}

class BootstrapTh extends BaseTh
{
    use BootstrapModifiableTrait;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}

class BootstrapTd extends BaseTd
{
    use BootstrapModifiableTrait;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}

class BootstrapInputGroup extends BaseTag
{
    use BootstrapSizeableTrait, BootstrapPullableTrait;

    public $tag = 'div';
    public $bootstrapSizePrefix  = 'form-control';
    public $bootstrapSizesAllowed = ['sm', 'lg', ];

    public function init()
    {
        parent::init();
        $this->addClass('input-group');
    }
}

class BootstrapButtonGroup extends BaseTag
{
    use BootstrapPullableTrait, BootstrapSizeableTrait;

    public $tag = 'div';
    public $bootstrapSizePrefix  = 'btn-group';
    public $bootstrapSizesAllowed = ['sm','lg'];

    public function init()
    {
        parent::init();
        $this->addClass('btn-group');
        $this->attributes['role'] = 'group';

    }

    function setVertical($val)
    {
        \DevLucid\html::errorBoolean($this, 'vertical', $val);
        return $this->toggleClass('btn-group-vertical',$val);
    }

    function getVertical()
    {
        return $this->hasClass('btn-group-vertical');
    }
}

class BootstrapButtonToolbar extends BaseTag
{
    use BootstrapPullableTrait, BootstrapSizeableTrait;

    public $tag = 'div';
    public $bootstrapSizePrefix  = 'btn-group';
    public $bootstrapSizesAllowed = ['sm','lg'];

    public function init()
    {
        parent::init();
        $this->addClass('btn-toolbar');
        $this->attributes['role'] = 'toolbar';
    }
}

class BootstrapNavItem extends BaseTag
{
    public function init()
    {
        parent::init();
        $this->tag = 'li';
        $this->addClass('nav-item');
    }
}

class BootstrapRow extends BaseTag
{
    use BootstrapGridableTrait;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('row');
    }
}

class BootstrapColumn extends BaseTag
{
    use BootstrapGridableTrait;

    public $tag = 'div';
}

class BootstrapCardHeader extends BaseTag
{
    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-header');
    }
}

class BootstrapCardFooter extends BaseTag
{
    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-footer');
    }
}
