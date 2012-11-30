Ext.define('EIA.model.Fluxo', {
    extend	: 'Ext.data.Model',
    idProperty  : 'idFluxo',	
    fields: [
    {
        name : 'idFluxo',
        type : 'int'
    },
    {
        name : 'conta_id',
        type : 'int'
    },	
    {
        name: 'dsDescricao',
        type: 'string'
    },	
    {
        name: 'NuValor',
        type: 'double'
    },
    {
        name: 'dtFluxo',
        type: 'date', 
        dateFormat:'Y-m-d'
    }    
    ]
});