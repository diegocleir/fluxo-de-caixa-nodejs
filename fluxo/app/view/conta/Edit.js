Ext.require(['EIA.view.AbstractForm']);
Ext.require(['EIA.view.AbstractWindow']);

Ext.define('EIA.view.conta.Edit', {
    extend: 'EIA.view.AbstractWindow',
    alias : 'widget.contaEdit',
    title : 'Edição de Conta',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [
                {
                    name : 'dsDescricao',
                    fieldLabel: 'Conta',
                    allowBlank	: false
                },
                {
                    name : 'fgTipo',
                    fieldLabel: 'Tipo',
                    allowBlank	: false
                }
            ]}
        ];
        this.callParent(arguments);
    }
});
Ext.require(['EIA.view.AbstractForm']);
Ext.require(['EIA.view.AbstractWindow']);

Ext.define('EIA.view.conta.Edit', {
    extend: 'EIA.view.AbstractWindow',
    alias : 'widget.contaEdit',
    title : 'Edição de Conta',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [
                {
                    name : 'dsDescricao',
                    fieldLabel: 'Conta',
                    allowBlank	: false
                },
                {
                    name : 'fgTipo',
                    fieldLabel: 'Tipo',
                    allowBlank	: false
                },
                {
                    name : 'conta_id',
                    fieldLabel : 'ID Conta',
                    allowBlank : true
                }
            ]}
        ];
        this.callParent(arguments);
    }
});
