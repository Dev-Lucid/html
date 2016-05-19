#!/usr/bin/env php
<?php

$files = glob(__DIR__.'/../src/base/meta/*.json');

echo("Building base tags...\n");
foreach ($files as $file) {
    $dir = str_replace('/meta', '/tags', dirname($file));
    $config = json_decode(file_get_contents($file), true);
    $config['name'] = str_replace('.json', '', basename($file));
    if (isset($config['tag']) === false) {
        $config['tag'] = $config['name'];
    }
    $config['name'] = str_replace('.json', '', basename($file));

    $additionalJs  = str_replace('.json', '.js', $file);
    $config['additionalJs'] = (file_exists($additionalJs) === true)?file_get_contents($additionalJs):'';

    $additionalPHP = str_replace('.json', '.php', $file);
    $config['additionalPHP'] = (file_exists($additionalPHP) === true)?file_get_contents($additionalPHP):'';

    $config['outputFile'] = $dir.'/'.$config['name'];
    $config['namespace'] = "Lucid\Html\Base\Tags";


    echo("\tBuilding ".str_pad($config['name'], 26, ".", STR_PAD_RIGHT));
    generatePHP($config);
    generateJavascript($config);
    echo("★\n");
}

function generatePHP($config)
{
    $src = '<'."?php\nnamespace ".$config['namespace'].";\n\n";
    $src .= "class ".$config['name']." extends \Lucid\Html\Tag\n{\n";

    if (isset($config['tag']) === true) {
        $src .= "\tpublic $"."tag = '".$config['tag']."';\n";
    }
    if (isset($config['parameters']) === true) {
        $src .= "\tpublic $"."parameters = ['".implode("', '", $config['parameters'])."'];\n";
    }
    if (isset($config['allowQuickClose']) === true) {
        $src .= "\tpublic $"."allowQuickClose = ".(($config['allowQuickClose'])?'true':'false').";\n";
    }
    if (isset($config['allowChildren']) === true) {
        $src .= "\tpublic $"."allowChildren = ".(($config['allowChildren'])?'true':'false').";\n";
    }
    if (isset($config['preChildrenHtml']) === true) {
        $src .= "\tpublic $"."preChildrenHtml = '".$config['preChildrenHtml']."';\n";
    }
    if (isset($config['postChildrenHtml']) === true) {
        $src .= "\tpublic $"."postChildrenHtml = '".$config['postChildrenHtml']."';\n";
    }

    if (isset($config['allowedAttributes']) === true) {
        $src .= "\n\tpublic function init()\n\t{\n";

        if (isset($config['allowedAttributes']) === true) {
            foreach($config['allowedAttributes'] as $attribute) {
                $src .= "\t\t$"."this->allowedAttributes[] = '$attribute';\n";
            }
        }

        $src .= "\t\tparent::init();\n\t}\n";
    }

    if (isset($config['disallowChildTags']) === true || isset($config['allowChildTags']) === true) {
        $src .= "\n\tpublic function checkValidChild($"."child) : bool\n\t{\n";

        if (isset($config['disallowChildTags']) === true) {
            $src .= "\t\tif (in_array($"."child->tag, ['".implode("', '", $config['disallowChildTags'])."']) === true) {\n";
            $src .= "\t\t\tthrow new \Exception('Invalid child. Tag ".$config['tag']." does not allow these tags as children: ".implode(", ", $config['disallowChildTags'])."');\n";
            $src .= "\t\t}\n";
        }

        if (isset($config['allowChildTags']) === true) {
            $src .= "\t\tif (in_array($"."child->tag, ['".implode("', '", $config['allowChildTags'])."']) !== true) {\n";
            $src .= "\t\t\tthrow new \Exception('Invalid child. Tag ".$config['tag']." only allows these tags as children: ".implode(", ", $config['allowChildTags'])."');\n";
            $src .= "\t\t}\n";
        }

        $src .= "\t\treturn true;\n\t}\n";
    }

    $src .= $config['additionalPHP'];

    $src .= "}\n";



    file_put_contents($config['outputFile'].'.php', $src);
}

function generateJavascript($config)
{
    $src = "lucid.html.base.tags.".$config['name']." = function(){\n";
    $src .= "\tlucid.html.tag.call(this);\n";

    if (isset($config['tag']) === true) {
        $src .= "\tthis.tag = '".$config['tag']."';\n";
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

    $src .= "};\n";

    $src .= "lucid.html.base.tags.".$config['name'].".prototype = Object.create(lucid.html.tag.prototype);\n";
    $src .= "lucid.html.base.tags.".$config['name'].".prototype.constructor = lucid.html.base.tags.".$config['name'].";\n";
    $src .= "lucid.html.builder.tags.".$config['name']." = lucid.html.base.tags.".$config['name'].";\n";
    #$src .= "lucid.html.builder.tags.".$config['name'].".prototype = new lucid.html.tag();\n";

    if (isset($config['allowedAttributes']) === true) {
        $src .= "\nlucid.html.base.tags.".$config['name'].".prototype.init=function(){\n";

        if (isset($config['allowedAttributes']) === true) {
            foreach($config['allowedAttributes'] as $attribute) {
                $src .= "\tthis.allowedAttributes.push('$attribute');\n";
            }
        }

        $src .= "\tlucid.html.tag.prototype.init.apply(this);\n};\n";
    }

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

        $src .= $config['additionalJs'];
    }

    file_put_contents($config['outputFile'].'.js', $src);
}

echo("Tags built.\n");
exit(0);