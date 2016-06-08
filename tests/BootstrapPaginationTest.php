<?php
use Lucid\Html\Html as html;

class BootstrapPaginationTest extends BaseTest
{
    public function setup()
    {
        static::$phpConstruct = '$factory = new \Lucid\Html\Factory(\'Bootstrap\');';
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function test_pagination1()
    {
        $output = '<nav><ul data-current-page="0" data-max-page="1" class="pagination pagination-lg"><li class="page-item disabled"><a href="#" class="page-link"><span aria-hidden="true">&laquo;</span><span class="sr-only">First</span></a></li><li class="page-item disabled"><a href="#" class="page-link"><span aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li><li class="page-item active"><span class="page-link">1<span class="sr-only"> (current)</span></span></li><li class="page-item disabled"><a href="#" class="page-link"><span aria-hidden="true">&gt;</span><span class="sr-only">Next</span></a></li><li class="page-item disabled"><a href="#" class="page-link"><span aria-hidden="true">&raquo;</span><span class="sr-only">Last</span></a></li></ul></nav>';
        $code = "@build('pagination')->set('size', 'lg')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<nav><ul data-current-page="0" data-max-page="2" class="pagination"><li class="page-item disabled"><a href="#0" class="page-link"><span aria-hidden="true">&laquo;</span><span class="sr-only">First</span></a></li><li class="page-item disabled"><a href="#0" class="page-link"><span aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li><li class="page-item active"><span class="page-link">1<span class="sr-only"> (current)</span></span></li><li class="page-item"><a href="#1" class="page-link">2</a></li><li class="page-item"><a href="#1" class="page-link"><span aria-hidden="true">&gt;</span><span class="sr-only">Next</span></a></li><li class="page-item"><a href="#1" class="page-link"><span aria-hidden="true">&raquo;</span><span class="sr-only">Last</span></a></li></ul></nav>';
        $code = "@build('pagination')->set('nbrOfPages', 2)->set('linkBuilder', function(\$object, \$nbr){ return '#'+.\$nbr; })->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<nav><ul data-current-page="1" data-max-page="2" class="pagination"><li class="page-item"><a href="#0" class="page-link"><span aria-hidden="true">&laquo;</span><span class="sr-only">First</span></a></li><li class="page-item"><a href="#0" class="page-link"><span aria-hidden="true">&lt;</span><span class="sr-only">Previous</span></a></li><li class="page-item"><a href="#0" class="page-link">1</a></li><li class="page-item active"><span class="page-link">2<span class="sr-only"> (current)</span></span></li><li class="page-item disabled"><a href="#1" class="page-link"><span aria-hidden="true">&gt;</span><span class="sr-only">Next</span></a></li><li class="page-item disabled"><a href="#1" class="page-link"><span aria-hidden="true">&raquo;</span><span class="sr-only">Last</span></a></li></ul></nav>';
        $code = "@build('pagination', 1, 2)->set('linkBuilder', function(\$object, \$nbr){ return '#'+.\$nbr; })->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}