<?php
    public function renderColspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1) {
            return null;
        }
        return $val;
    }
?>