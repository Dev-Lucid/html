<?php
namespace Lucid\Html\Base\Tags;

class head extends \Lucid\Html\Tag
{
	public $tag = 'head';

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['title', 'link', 'script', 'base', 'meta', 'style']) !== true) {
			throw new \Exception('Invalid child. Tag head only allows these tags as children: title, link, script, base, meta, style');
		}
		return true;
	}
}
