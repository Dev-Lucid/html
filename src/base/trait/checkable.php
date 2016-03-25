<?php
namespace Lucid\Html\Base\Trait;

trait Checkable
{
    public function CheckableInit()
    {
        $this->allowedAttributes[] = 'checked';
    }

    public function setChecked($val)
    {
        # some databases (sqlite3) are annoying about how they store/return booleans.
        # This code makes some reasonable attempts to coerce the passed value into a real php boolean.
        if (strval($val) === '1') {
            $val = true;
        } elseif (strval($val) === '0') {
            $val = false;
        } elseif (strval($val) === '') {
            $val = false;
        } elseif (strval($val) === 'true') {
            $val = true;
        } elseif (strval($val) === 'false') {
            $val = false;
        }

        $type = (isset($this->attributes['type']))?$this->attributes['type']:'unknown';
        if (in_array($type, ['radio', 'checkbox',]) === false) {
            throw new \Exception('Attribute checked cannot be used on input type '.$type.'; only for types radio and checkbox.');
        }
        if ($val !== true && $val !== false) {
            throw new \Exception('Attribute checked only accepts values true or false.');
        }
        $this->attributes['checked'] = ($val === true || $val === 'true' || $val === 1 || $val === strval('1'));
        return $this;
    }

    public function renderChecked()
    {
        $val = ($this->attributes['checked'] === true)?'checked':null;
        return $val;
    }
}