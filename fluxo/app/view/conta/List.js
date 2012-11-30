Ext.require(['EIA.view.AbstractList']);
Ext.require(['Ext.selection.CheckboxModel']);

Ext.define('EIA.view.conta.List' ,{
    extend			: 'EIA.view.AbstractList',
    alias 			: 'widget.contaList',
    store			: 'Contas',
    //selModel: {mode: 'MULTI'},
    title 			: 'Lista das Contas',         
    selModel     		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

	this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'idConta',  flex: 1},
        {header: 'Nome',  dataIndex: 'dsDescricao',  flex: 1},
        {header: 'Tipo',  dataIndex: 'fgTipo',  flex: 1}
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Contas',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});
Ext.require(['EIA.view.AbstractList']);
Ext.require(['Ext.selection.CheckboxModel']);

Ext.define('EIA.view.conta.List' ,{
    extend			: 'EIA.view.AbstractList',
    alias 			: 'widget.contaList',
    store			: 'Contas',
    //selModel: {mode: 'MULTI'},
    title 			: 'Lista das Contas',         
    selModel     		: Ext.create('Ext.selection.CheckboxModel'),
    initComponent	: function(){

	this.columns = [
        Ext.create('Ext.grid.RowNumberer'),
        {header: 'Código',  dataIndex: 'idConta',  flex: 1},
        {header: 'Nome',  dataIndex: 'dsDescricao',  flex: 1},
        {header: 'Tipo',  dataIndex: 'fgTipo',  flex: 1},
        {header: 'ID Conta',  dataIndex: 'conta_id',  flex: 1}        
	]; 
		
	this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Contas',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});
