<?php
namespace Lucid\Html\Base\Tag;

class Image extends \Lucid\Html\Tag
{
    public $tag = 'img';
    public $parameters = ['src','width','height','alt'];
    public $allowChildren = false;
    public $allowQuickClose = true;
}
