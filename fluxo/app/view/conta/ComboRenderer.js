Ext.define('EIA.view.conta.ComboRenderer', {
    extend			: 'Ext.form.field.ComboBox',
    alias			: 'widget.contaComboRenderer',
    name 			: 'conta_id',    
    fieldLabel		: 'Conta',
    store		: 'Contas',
    displayField	: 'dsDescricao',
    valueField		: 'idConta',
    queryMode		: 'local',	//Server fazer a busca por que os dados nao estao carregados 		
	//local - os dados ja est�o carregados 
    typeAhead   	: true,
    forceSelection	: true,
    initComponent	: function() {
        this.callParent(arguments);
        this.store.load();
    }
});