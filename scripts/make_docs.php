<?php
global $options, $output;
$options = [
    'output'=>realpath(__DIR__.'/../docs/'),
    'template'=>realpath(__DIR__.'/../docs/template'),
    'flavors'=>'base,bootstrap',
    'src'=>realpath(__DIR__.'/../src'),
];
$output = [

];

array_shift($argv);
if (count($argv) == 0 || $argv[0] != 'build') {
    printUsage();
}
array_shift($argv);

foreach ($argv as $option) {
    $parts = explode('=', $option);
    $optName = array_shift($parts);
    if(count($parts) > 0){
        $optValue = implode('=', $parts);

        # fix booleans
        if ($optValue == 'true' || $optValue == 'false') {
            $optValue = ($optValue == 'true');
        }
    } else {
        $optValue = true;
    }
    $options[$optName] = $optValue;
}


function printUsage()
{
    global $options, $output;
    echo("Usage: php -f make_docs.php [build|help] [[option]=[value]]\n");
    echo("You may pass as many options as you want to override any configuration option. Current options are as follows:");
    print_r($options);
    exit();
}

function getFilesInDirectory($directory)
{
    global $options, $output;
    $files = glob($options['src'].'/'.$directory.'/*.php');
    return $files;

}



# do some last second cleanup on the options:
$options['flavors'] = explode(',', $options['flavors']);


echo("Doing build now using config: \n");
print_r($options);
include(__DIR__.'/../html.php');
\DevLucid\html::init('bootstrap');

# set some final things that cannot be set via command line parameters (yet);
$options['staticIncludes'] = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'=>'',
    'https://code.jquery.com/jquery-1.12.2.min.js'=>'jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js'=>'',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js'=>'',
    'https://maxcdn.bootstrapcdn.com/js/ie10-viewport-bug-workaround.js'=>'',
];

$classes = [];
foreach ($options['flavors'] as $flavor) {
    $files = glob($options['src'].'/'.$flavor.'/tags/*.php');

    foreach ($files as $file) {

        $classes[] = str_replace('.php', '', basename($file));

        /*
        $qualifiedClass = '\\DevLucid\\'.$flavor.'\\Tags\\'.$class;
        echo("looking to include $qualifiedClass: $file\n");

        try {
            $rc = new ReflectionClass($qualifiedClass);
            print_r($rc);
            if(is_null($rc) === false) {
                if (strtolower($rc->getFileName()) != strtolower($file)) {
                    echo ("we have a problem. $qualifiedClass already exists, and was defined in ".$rc->getFileName()."\n");
                    exit();
                }
            }
            #echo("uh oh, $qualifiedClass was already declared in ".$rc->getFileName()."\n");
            #exit();
        } catch(ReflectionException $Exception) {
            echo("Class does not exist (this is good!)\n");
        }

        try {
            include_once($file);
        }
        catch(Exception $e) {
            echo('Caught: '.$e->getMessage()."\n");
        }
        */
    }
}


foreach ($classes as $class) {
    $obj = \DevLucid\html::$class();
    echo($obj->render()."\n");
}


foreach ($options['staticIncludes'] as $url=>$fileName) {
    $fileName = ($fileName == '')?basename($url):$fileName;
    $fileName = $options['output'].'/includes/'.$fileName;

    if( file_exists($fileName) === false) {
        echo("Retrieving ".$url."\n");
        file_put_contents($fileName, file_get_contents($url));
    }
}
buildMasterDocument();
exit("Complete\n");



function buildMasterDocument()
{
    global $options, $output;
    $src = file_get_contents($options['template'].'/template.index.html');
    $src = replaceKeys($src, [
        'title'=>'DevLucid\\HTML Documentation',
        'content:GettingStarted'=>file_get_contents($options['template'].'/content/GettingStarted.html'),
    ]);

    file_put_contents($options['output'].'/index.html', $src);
}


function replaceKeys($src, $keys) {
    foreach ($keys as $key=>$value) {
        $src = str_replace('{{'.$key.'}}', $value, $src);
    }
    return $src;
}


