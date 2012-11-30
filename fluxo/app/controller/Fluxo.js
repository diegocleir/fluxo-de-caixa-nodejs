Ext.require('Ext.window.MessageBox');
Ext.define('EIA.controller.Fluxo', {
    extend: 'Ext.app.Controller',
    stores: ['Fluxos'],
    models: ['Fluxo'], 
	
    views: [
    'fluxo.Edit',
	'fluxo.List'    
    ],
    
    refs: [
    {
        ref:'fluxoEdit', 
        selector:'fluxoEdit'
    },
    {
        ref:'fluxoList', 
        selector:'fluxoList'
    }
    ],

    init: function() {
        this.control({
            'fluxoList': {
                itemdblclick: this.edit
            },

            'fluxoList button[action=insert]': {
                click: this.insert
            },
            
            'fluxoList button[action=edit]': {
                click: this.edit
            },

            'fluxoList button[action=destroy]': {
                click: this.destroy
            },
            
            'fluxoList button[action=refresh]': {
                click: this.refresh
            },

            'fluxoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getFluxoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('fluxoEdit');
        view.setTitle('Novo Fluxo');
    },
    
    destroy: function() {
        
        var grid    = this.getFluxoList(),
            records = grid.getSelectionModel().getSelection();

        if(records.length === 0){
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }else{
            Ext.Msg.show({
                title : 'Confirmação',
                msg : 'Tem certeza que deseja deletar o(s) registro(s) selecionado(s)?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                width : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') 
					{						                        
						// array para armazenar o(s) id(s) dos registros a serem excluídos
						var idSel = [];
			
						// atribui o(s) id(s) dos registros selecionados ao array de id(s) dos registros a serem excluídos
						for( var i = 0 ; i < records.length ; i++ )
						{
							idSel.push(records[i].data.idFluxo);
						}
				
			// faz a requisição da exclusão
			Ext.Ajax.request ({
				scope	: this,
				url		: '/fluxos/delete', //arquivo que contém o método a utilizar
				params	: {
							'id[]'	: idSel //manda o array idSel para o método excluir o registro 
						  },
				success: function(r){ // se a exclusão foi executada com sucesso
					//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
					var obj = Ext.decode(r.responseText);
					//Verificamos se obtivemos sucesso na ação
					if(obj.success){						
						Ext.Msg.alert('Sucesso', obj.message);
						this.getFluxoList().store.loadPage(1);
						//this.getAgendaList().store.load(); // atualiza informações do grid												 
					}
					else{
						Ext.Msg.alert('Erro', obj.message); //exibe a mensagem
					}
				},
				failure: function(){ // se houve algum erro ao submeter o formulário 					
					Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.'); //exibe a mensagem
				}
			});
												
                    }
                }
            });
        }
    },

    save: function(button) {	
        
        var win     	= button.up('window'),
            form    	= win.down('form').getForm(),
            idFluxo	= form.getRecord() ? form.getRecord().get('idFluxo') : 0;
			
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();
            if (record)
			{												
                if(record.data['idFluxo'])
				{						
					Ext.Ajax.request ({
						scope	: this,
						url		: '/fluxos/update', //arquivo que contém o método a utilizar
						params	: {
						'idFluxo'					: idFluxo,
						'dsDescricao'	   				: values.dsDescricao,
						'NuValor'                                       : values.NuValor,
						'dtFluxo'	   				: values.dtFluxo,
						'conta_id'                                      : values.conta_id
						//manda os dados do form 
						},
						success: function(r){ 
							//Se tudo OK, pegamos a resposta que é um JSON e decodificamos para um objeto
							var obj = Ext.decode(r.responseText);
							//Verificamos se obtivemos sucesso na ação
							if(obj.success)
							{
								Ext.Msg.alert('Sucesso', obj.message);								
							}
							else
							{
								Ext.Msg.alert('Erro', obj.message); //exibe a mensagem								
							}
						},
						failure: function(){ // se houve algum erro ao submeter o formulário 					
								Ext.Msg.alert('Erro', 'Erro na comunicação com o servidor.'); //exibe a mensagem
						}
					});																								
                }
            } 
			else
			{
                record = Ext.create('EIA.model.Fluxo');
                record.set(values);
                this.getFluxoList().store.add(record);
		this.getFluxoList().store.sync();				
            }
			
            win.close();            
            this.getFluxoList().store.load();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getFluxoList().getSelectionModel().getSelection();    	    	
        if(records.length === 1){
            var editWind = Ext.widget('fluxoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }
});