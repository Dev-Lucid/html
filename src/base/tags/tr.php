<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class Tr extends \Lucid\Html\Tag
{
    function checkValidChild($child)
    {
        if (in_array($child->tag, ['td', 'th',]) === false) {
            throw new \Exception(html::errorChildTag($child->tag, ['td', 'th',], null));
        }
    }
}
