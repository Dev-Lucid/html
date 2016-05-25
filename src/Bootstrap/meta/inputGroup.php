<?php
    public function add($child) : \Lucid\Html\TagInterface
    {
        if (is_object($child) === true) {
            if ($child->tag == 'input' || $child->tag == 'select' || $child->tag == 'textarea') {
                parent::add($child);
            } elseif ($child->tag == 'button' || ($child->tag == 'a' && $child->hasClass('btn') === true)) {
                parent::add('<span class="input-group-btn">');
                parent::add($child);
                parent::add('</span>');
            } else {
                parent::add('<span class="input-group-addon">');
                parent::add($child);
                parent::add('</span>');
            }
        } else {
            parent::add('<span class="input-group-addon">');
            parent::add($child);
            parent::add('</span>');
        }
        return $this;
    }
?>