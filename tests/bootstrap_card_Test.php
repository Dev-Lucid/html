<?php
use Lucid\Html\Html;


class bootstrap_card_test extends PHPUnit_Framework_TestCase
{
    function test_basic_struture()
    {
        $card = html::card();

        # super basic test, makes sure card class is at least loaded
        $this->assertEquals('<div class="card"></div>', $card->render());

        # more complete structure, also ensures that 'child' is correctly handled as first parameter for header/block/footer
        $card->add(html::cardHeader('test header'));
        $card->add(html::cardBlock('test block'));
        $card->add(html::cardFooter('test footer'));
        $this->assertEquals('<div class="card"><div class="card-header">test header</div><div class="card-block">test block</div><div class="card-footer">test footer</div></div>', $card->render());

        # try out the auto header functionality
        $card = html::card();
        $card->header('test');
        $this->assertEquals('<div class="card"><div class="card-header">test</div></div>', $card->render());
        $this->assertEquals('<div class="card-header">test</div>', $card->header());

        $card->header()->add(' adding second string');
        $this->assertEquals('<div class="card"><div class="card-header">test adding second string</div></div>', $card->render());

        # basically the same tests, but for the footer
        $card = html::card();
        $card->footer('test');
        $this->assertEquals('<div class="card"><div class="card-footer">test</div></div>', $card->render());
        $this->assertEquals('<div class="card-footer">test</div>', $card->footer());

        $card->footer()->add(' adding second string');
        $this->assertEquals('<div class="card"><div class="card-footer">test adding second string</div></div>', $card->render());

        # testing both together, but out of order
        $card = html::card();
        $card->block('block');
        $card->footer('footer');
        $card->header('header');
        $this->assertEquals('<div class="card"><div class="card-header">header</div><div class="card-block">block</div><div class="card-footer">footer</div></div>', $card->render());
    }
}