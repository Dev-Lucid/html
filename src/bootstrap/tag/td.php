<?php
namespace Lucid\Html\Bootstrap\Tag;

class Td extends \DevLucid\Base\Tags\Td
{
    use \Lucid\Html\Bootstrap\Trait\Modifiable;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}
