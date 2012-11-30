<?php

$menu = "{ 
            children: [
                    {
                        text:'Cadastros',
                        expanded: true,
                        children:[
                            {
                                text:'Usuários',
                                leaf: true,
                                itemMenu: 'usuarioList'
                            },
                            {
                                text:'Conta',
                                leaf:true,
                                itemMenu: 'contaList'
                            },{
                                text:'Fluxo',
                                leaf:true,
                                itemMenu: 'fluxoList'
                            }
                        ]
                    }
                    ,
                    {
                        text:'Relatórios',
                        expanded: true,
                        children:[
                            {
                                text:'Gráfico de Contas',
                                leaf:true,
                                itemMenu: 'graficoConta'
                            }
                        ]
                    }
                ]
            }";
echo $menu;