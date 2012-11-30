Ext.define('EIA.view.AbstractList',{
    extend			: 'Ext.grid.Panel',
    alias			: 'widget.abstractlist',
    title			: 'Listagem',
    columnLines		: true,	
    frame			: true,
    initComponent	: function(){        
        this.tbar = [
            {
                text: 'Novo registro',
                action: 'insert',
                iconCls: 'add',
                itemId: 'insert'
            }
            ,{
                text: 'Editar',
                action: 'edit',
                iconCls: 'edit',
                itemId: 'edit',
                disabled: true
            },
            {
                text: 'Excluir',
                action: 'destroy',
                iconCls: 'delete',
                itemId: 'delete',
                disabled: true
            }
            ,{
                text: 'Recarregar dados',
                action: 'refresh',
                iconCls: 'refresh',
                itemId: 'refresh'
            }
        ];
        
        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
        
    onRender: function(){
        this.store.load();
        this.callParent(arguments);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length !== 1);
    }   
});