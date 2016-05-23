#!/usr/bin/env php
<?php

$file = $argv[1];
$dir = str_replace('/meta', '/tags', dirname($file));
$config = json_decode(file_get_contents($file), true);
$config['name'] = str_replace('.json', '', basename($file));
if (isset($config['tag']) === false) {
    $config['tag'] = $config['name'];
}

$additionalJs  = str_replace('.json', '.js', $file);
$config['additionalJs'] = (file_exists($additionalJs) === true)?file_get_contents($additionalJs):'';

$config['outputFile'] = $dir.'/'.$config['name'];
$config['namespace'] = "Lucid\Html\Base\Tags";

if (isset($config['inheritFrom']) === false) {
    $config['inheritFrom'] = 'Lucid\\Html\\Tag';
}
$config['inheritFrom'] = strtolower($config['inheritFrom']);
$config['inheritFrom'] = str_replace('\\', '.', $config['inheritFrom']);

$files = glob(__DIR__.'/../src/base/meta/*.json');
echo("\tBuilding JS for ".str_pad($config['name'], 27, ".", STR_PAD_RIGHT));
generateJavascript($config);
echo("★\n");

function generateJavascript($config)
{
    $src = "lucid.html.base.tags.".$config['name']." = function(){\n";
    $src .= "\t".$config['inheritFrom'].".call(this);\n";
    
    if (isset($config['traits']) === true) {
        foreach ($config['traits'] as $trait) {
            $trait = explode('\\', $trait);
            $trait[0] = strtolower($trait[0]);
            $trait[1] = strtolower($trait[1]);
            $trait[2] = strtolower($trait[2]);
            $trait[3] = strtolower($trait[3]);
            $src .= "\tthis.addTrait(".implode('.', $trait).");\n";
        }
        $src .= "\n";
    }

    if (isset($config['tag']) === true) {
        $src .= "\tthis.tag = '".$config['tag']."';\n";
    }
    if (isset($config['allowedAttributes']) === true) {
        foreach($config['allowedAttributes'] as $attribute) {
            $src .= "\tthis.allowedAttributes.push('$attribute');\n";
        }
    }
    if (isset($config['parameters']) === true) {
        $src .= "\tthis.parameters = ['".implode("', '", $config['parameters'])."'];\n";
    }
    if (isset($config['allowQuickClose']) === true) {
        $src .= "\tthis.allowQuickClose = ".(($config['allowQuickClose'])?'true':'false').";\n";
    }
    if (isset($config['allowChildren']) === true) {
        $src .= "\tthis.allowChildren = ".(($config['allowChildren'])?'true':'false').";\n";
    }
    if (isset($config['preChildrenHtml']) === true) {
        $src .= "\tthis.preChildrenHtml = '".$config['preChildrenHtml']."';\n";
    }
    if (isset($config['postChildrenHtml']) === true) {
        $src .= "\tthis.postChildrenHtml = '".$config['postChildrenHtml']."';\n";
    }
    if (isset($config['properties']) === true) {
        foreach ($config['properties'] as $name=>$value) {
            $src .= "\tthis.$name = $value;\n";
        }
    }
    
    if (isset($config['attributes']) === true) {
        foreach ($config['attributes'] as $name=>$value) {
            $src .= "\tthis.attributes['$name'] = $value;\n";
        }
    }


    $src .= "};\n";


    
    $src .= "lucid.html.base.tags.".$config['name'].".prototype = Object.create(".$config['inheritFrom'].".prototype);\n";
    #$src .= "lucid.html.base.tags.".$config['name'].".prototype.constructor = lucid.html.base.tags.".$config['name'].";\n";
    $src .= "lucid.html.builder.tags.".$config['name']." = lucid.html.base.tags.".$config['name'].";\n";
    #$src .= "lucid.html.builder.tags.".$config['name'].".prototype = new lucid.html.tag();\n";

    /*
    if (isset($config['allowedAttributes']) === true) {
        $src .= "\nlucid.html.base.tags.".$config['name'].".prototype.init=function(){\n";

        if (isset($config['allowedAttributes']) === true) {
            foreach($config['allowedAttributes'] as $attribute) {
                $src .= "\tthis.allowedAttributes.push('$attribute');\n";
            }
        }

        #$src .= "\tlucid.html.tag.prototype.init.apply(this);\n";
        $src .= "\t};\n";
    }
    */

    if (isset($config['disallowChildTags']) === true || isset($config['allowChildTags']) === true) {
        $src .= "\nlucid.html.base.tags.".$config['name'].".prototype.checkValidChild=function(child){\n";

        if (isset($config['disallowChildTags']) === true) {
            $src .= "\tif (['".implode("', '", $config['disallowChildTags'])."'].indexOf(child.tag) >= 0) {\n";
            $src .= "\t\tthrow 'Invalid child. Tag ".$config['tag']." does not allow these tags as children: ".implode(", ", $config['disallowChildTags'])."';\n";
            $src .= "\t}\n";
        }

        if (isset($config['allowChildTags']) === true) {
            $src .= "\tif (['".implode("', '", $config['allowChildTags'])."'].indexOf(child.tag) < 0) {\n";
            $src .= "\t\tthrow 'Invalid child. Tag ".$config['tag']." only allows these tags as children: ".implode(", ", $config['allowChildTags'])."';\n";
            $src .= "\t}\n";
        }

        $src .= "};\n";
        
    }
    
    $src .= $config['additionalJs'];

    file_put_contents($config['outputFile'].'.js', $src);
}

