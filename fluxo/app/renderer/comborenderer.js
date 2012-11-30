Ext.util.Format.comboRenderer = function(combo){
    return function(value){
        if (!value) 
		{
            return combo.valueNotFoundText;
        } 
		else 
		{
            var record = combo.store.findRecord(combo.valueField || combo.displayField, value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    }
}