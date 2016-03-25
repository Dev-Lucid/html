<?php
namespace Lucid\Html\Base\Tag;

class Td extends \Lucid\Html\Tag
{
    public function init()
    {
        $this->allowedAttributes[] = 'colspan';
        $this->allowedAttributes[] = 'rowspan';
    }

    public function checkValidChild($child)
    {
        if (in_array($child->tag, ['tr', 'td', 'th',]) === true) {
            throw new \Exception(\DevLucid\html::errorChildTag($child->tag, null, ['tr', 'td', 'th',]));
        }
    }

    public function renderColspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1) {
            return null;
        }
        return $val;
    }
}
