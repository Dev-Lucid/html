#!/usr/bin/env php
<?php

$file = $argv[1];
$dir = str_replace('/meta', '/Tags', dirname($file));
$config = json_decode(file_get_contents($file), true);
$config['name'] = str_replace('.json', '', basename($file));
if (isset($config['tag']) === false) {
    $config['tag'] = $config['name'];
}

$additionalPHP = str_replace('.json', '.php', $file);

if (file_exists($additionalPHP) === true) {
    $config['additionalPHP'] = file_get_contents($additionalPHP);
    $config['additionalPHP'] = str_replace('<'.'?php', '', $config['additionalPHP']);
    $config['additionalPHP'] = str_replace('?'.'>', '', $config['additionalPHP']);
} else {
    $config['additionalPHP'] = '';
}

$config['outputFile'] = $dir.'/'.$config['name'];

if (isset($config['namespace']) === false) {
    $config['namespace'] = "Lucid\Html\Base\Tags";
}

if (isset($config['inheritFrom']) === false) {
    $config['inheritFrom'] = 'Lucid\\Html\\Tag';
}

echo("\tBuilding PHP for ".str_pad($config['name'], 26, ".", STR_PAD_RIGHT));
generatePHP($config);
echo("★\n");

function generatePHP($config)
{
    $src = '<'."?php\nnamespace ".$config['namespace'].";\n\n";
    $src .= "class ".$config['name']." extends \\".$config['inheritFrom']."\n{\n";
        
    if (isset($config['traits']) === true) {
        foreach ($config['traits'] as $trait) {
            $src .= "\tuse \\$trait;\n";
        }
        $src .= "\n";
    }

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
    
    if (isset($config['properties']) === true) {
        foreach ($config['properties'] as $name=>$value) {
            $src .= "\tpublic \$$name = $value;\n";
        }
    }
    
    if (isset($config['attributes']) === true) {
        $src .= "\tpublic \$attributes = [\n";
        foreach ($config['attributes'] as $name=>$value) {
            $src .= "\t\t'$name'=>$value,\n";
        }
        $src .= "\t];\n";
    }

    if (isset($config['allowedAttributes']) === true || isset($config['classes']) === true) {
        $src .= "\n\tpublic function init()\n\t{\n";

        if (isset($config['classes']) === true) {
            foreach ($config['classes'] as $newClass) {
                $src .= "\t\t\$this->addClass('$newClass');\n";
            }
        }
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
