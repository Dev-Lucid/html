<?php

include('factory.php');
DevLucid\factory::init('bootstrap');
/*
$anchor = html::anchor('#!index.php','testing');

$div = html::div();
$div->add('hiya');
$div->paragraph('paragraph 1');
$div->paragraph('paragraph 2');
$div->paragraph('paragraph 3');

$table = html::table();
$row = $table->row();
$row->modifier('success');
$row->add(html::td('testing 1'));
#$row->add(html::td('testing 2'));
$table->head('testing head func');
$table->foot('testing foot func');

$fieldset = html::fieldset();
$fieldset->legend('testing');
$fieldset->add('hiya');



$button = html::button('test button',"alert('test button');",'submit')->size('lg')->modifier('primary-outline')->active(true);

$header1 = html::h1('testing header 1')->pull('left');
$header2 = html::h2('testing header 2');
*/

$fg1 = html::form_group('E-mail', html::input('text','email','iq.mthorn@gmail.com'), 'Put your email here')->use_grid(true);
$fg2 = html::form_group('Remember Me', html::input('checkbox','remember_me', true, ' more label'), 'checkbox help text')->use_grid(false);
$fg3 = html::form_group('Form group radio', html::input('radio','radio2','val1', true)->disabled(true));
$fg4 = html::form_group('Form group radio', html::input('radio','radio2','val2', false));
$fg5 = html::form_group('Form group radio', html::input('radio','radio2','val3', false));

echo( $fg1 . $fg2);
