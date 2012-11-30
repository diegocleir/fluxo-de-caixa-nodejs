Ext.define('EIA.view.AbstractWindow',{
    extend: 'Ext.window.Window',
    alias: 'widget.abstractwindow',
    title: 'Edição',
    layout: 'fit',
    autoShow: true,
    modal: true,    
    initComponent: function(){
        
        this.buttons = [{
            text: 'Salvar',
            action: 'save',
            iconCls: 'save'
        },
        {
            text: 'Cancelar',
            scope: this,
            iconCls: 'cancel',
            handler: this.close
        }];        
        this.callParent(arguments);
    }
});