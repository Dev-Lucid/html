<?php
namespace Lucid\Html\Base\Tag;

class Thead extends \Lucid\Html\Tag
{
    public $tag = 'thead';
    public $preChildrenHtml = '<tr>';
    public $postChildrenHtml = '</tr>';
    public $parameters = ['child'];
}
