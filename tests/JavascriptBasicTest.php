<?php
use Lucid\Html\Html;

class JavascriptBasicTest extends PHPUnit_Framework_TestCase
{
    public $includeFiles = [];
    public $filePrefix;
    public function setup()
    {
        $this->includeFiles[] = __DIR__.'/../src/base/js/lucid.html.js';
        $this->includeFiles[] = __DIR__.'/../src/tag.js';
        $this->includeFiles[] = __DIR__.'/../src/tag__class_style_methods.js';
        $this->includeFiles[] = __DIR__.'/../src/base/js/lucid.html.builder.js';
        $this->includeFiles[] = __DIR__.'/../src/base/tags/anchor.js';
        $this->includeFiles[] = __DIR__.'/../src/base/tags/h1.js';
        $this->includeFiles[] = __DIR__.'/../src/base/tags/bold.js';
        $this->includeFiles[] = __DIR__.'/bootstrap.js';
    }

    public function callFile($filename)
    {
        $files = $this->includeFiles;
        $finalFile = '/tmp/test'.strval(time()).'.js';

        $cmd  = 'cat '.implode(' ', $this->includeFiles);
        $cmd .= ' '.__DIR__.'/'.__CLASS__.'_'.$filename.'.js';
        $cmd .= ' > '.$finalFile.'; node '.$finalFile;

        $result = shell_exec($cmd);

        return $result;
    }

    public function callFragment($fragment, $fileId)
    {
        $files = $this->includeFiles;
        $finalFile = '/tmp/test_'.__CLASS__.'_'.$fileId.'.js';

        $cmd  = 'cat '.implode(' ', $this->includeFiles).' > '.$finalFile.';';
        $result = shell_exec($cmd);
        file_put_contents($finalFile, file_get_contents($finalFile) .$fragment);
        $cmd = 'node '.$finalFile;
        $result = shell_exec($cmd);

        return $result;
    }

    public function test_basic_tags()
    {
        $result = $this->callFragment("process.stdout.write(lucid.html.build('html').render());", 'fragtest0');
        $this->assertEquals('<html></html>', $result);

        $result = $this->callFragment("process.stdout.write(lucid.html.build('h1', 'hiya').render());", 'fragtest1');
        $this->assertEquals('<h1>hiya</h1>', $result);

        $result = $this->callFragment("process.stdout.write(lucid.html.build('anchor', 'google.com', 'google').render());", 'fragtest2');
        $this->assertEquals('<a href="google.com">google</a>', $result);

        $result = $this->callFragment("process.stdout.write(lucid.html.build('bold', 'boldtest').render());", 'fragtest3');
        $this->assertEquals('<b>boldtest</b>', $result);

        $result = $this->callFragment("process.stdout.write(lucid.html.build('h1', 'hiya').addClass('testing').render());", 'fragtest4');
        $this->assertEquals('<h1 class="testing">hiya</h1>', $result);
    }
}