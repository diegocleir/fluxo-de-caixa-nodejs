Ext.require(['EIA.view.AbstractForm']);
Ext.require(['EIA.view.AbstractWindow']);
Ext.require(['EIA.view.conta.Combo']);

Ext.define('EIA.view.fluxo.Edit', {
    extend: 'EIA.view.AbstractWindow',
    alias : 'widget.fluxoEdit',
    title : 'Edição de Fluxo',

    initComponent: function() {
    	
        this.items = [{
            xtype: 'abstractform',
            items: [
			{
                xtype		: 'contaCombo'
            },
            {
                name 		: 'dsDescricao',
                fieldLabel	: 'Descrição',
		allowBlank	: false				
            },
            {
                name 		: 'NuValor',
                fieldLabel	: 'Valor',
		allowBlank	: false				
            },
            {
                xtype		: 'datefield',
                name 		: 'dtFluxo',
                ref		: 'dtFluxo',
                fieldLabel	: 'Data',
                maxValue	: new Date(),
                format		: 'd/m/Y',
                submitFormat    : 'Y-m-d',
                allowBlank	: false
            }            			
			]}
        ];
        this.callParent(arguments);
    }
});
