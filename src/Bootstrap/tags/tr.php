<?php
namespace Lucid\Html\Bootstrap\Tags;

class Tr extends \Lucid\Html\Base\Tags\Td
{
    use \Lucid\Html\Bootstrap\Traits\Modifiable;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}
