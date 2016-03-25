<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class Anchor extends \Lucid\Html\Tag
{
    public $tag = 'a';
    public $parameters = ['href','child'];

    public function init()
    {
        $this->allowedAttributes[] = 'name';
        $this->allowedAttributes[] = 'target';
    }

    public function checkValidChild($child)
    {
        if ($child->tag == 'a') {
            throw new \Exception(html::errorChildTag('a', null, ['a']));
        }
    }
}
