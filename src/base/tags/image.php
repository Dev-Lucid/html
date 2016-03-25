<?php
namespace Lucid\Html\Base\Tags;

class Image extends \Lucid\Html\Tag
{
    public $tag = 'img';
    public $parameters = ['src','width','height','alt'];
    public $allowChildren = false;
    public $allowQuickClose = true;
}
