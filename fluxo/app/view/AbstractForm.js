Ext.define('EIA.view.AbstractForm',{
    extend		: 'Ext.form.Panel',
    alias		: 'widget.abstractform',
    padding		: '5 5 0 5',
    bodyPadding	: 10,
    border		: false,
    style		: 'background-color:#fff',
    fieldDefaults:{
        anchor			: '100%',
        labelAlign		: 'left',
        labelWidth		: 150,
        allowBlank		: false,
        combineErrors	: false,
        msgTarget		: 'side'
    },
    defaultType: 'textfield'
});