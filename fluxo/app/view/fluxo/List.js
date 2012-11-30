Ext.require(['EIA.view.conta.ComboRenderer']);
Ext.require(['EIA.view.AbstractList']);
Ext.require(['Ext.selection.CheckboxModel']);
Ext.require(['Ext.grid.column.Date']);

Ext.define('EIA.view.fluxo.List' ,{
    extend		: 'EIA.view.AbstractList',
    alias 		: 'widget.fluxoList',
    store		: 'Fluxos',
    title 		: 'Lista dos Fluxos',
    //selModel: {mode: 'MULTI'},
    selModel            : Ext.create('Ext.selection.CheckboxModel'),	
    initComponent       : function(){

		this.columns = [
                Ext.create('Ext.grid.RowNumberer'),
		{header: 'Código',  dataIndex: 'idFluxo',  flex: 1}, 
		{header: 'Conta', dataIndex: 'conta_id', flex: 1,
                    field : Ext.create('EIA.view.conta.ComboRenderer'),
                    renderer : Ext.util.Format.comboRenderer(Ext.create('EIA.view.conta.ComboRenderer'))
            //renderer: function (value, metadata, record, rowIndex, colIndex, store) 
			//{                    			                 
			//	var idx = this.columns[colIndex].field.store.find('idCategoria', value);
			//	return idx !== -1 ? this.columns[colIndex].field.store.getAt(idx).get('NmCategoria') : '';
           //}
                },        
		{header: 'Descrição',  dataIndex: 'dsDescricao',  flex: 1},         
		{header: 'Valor',  dataIndex: 'NuValor',  flex: 1},
		{header		: 'Data',  
                    dataIndex	: 'dtFluxo',  
                    flex		: 1, 
                    xtype		: 'datecolumn', 
                    format		: 'Y-m-d',
                    ///altFormats      : 'Y-m-d',  //2012-11-09 00:00:00,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                } 			
		]; 
		
		this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Fluxos',
            dock: 'bottom',
            displayInfo: true
        }];
		
        this.callParent();        
    }   
});