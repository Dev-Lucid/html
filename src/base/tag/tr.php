<?php
namespace Lucid\Html\Base\Tag;

class Tr extends \Lucid\Html\Tag
{
    function checkValidChild($child)
    {
        if (in_array($child->tag, ['td', 'th',]) === false) {
            throw new \Exception(\DevLucid\html::errorChildTag($child->tag, ['td', 'th',], null));
        }
    }
}
