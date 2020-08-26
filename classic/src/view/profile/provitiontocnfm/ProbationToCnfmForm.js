
Ext.define('DDO.view.profile.provitiontocnfm.ProbationToCnfmForm', {
    extend: 'Ext.window.Window',
    xtype: 'probationtocnfmform',
    requires: [
        'DDO.view.profile.provitiontocnfm.ProbationToCnfmFormController',
        'DDO.store.projects.ProjectDashboardStore'
    ],
    controller: 'probationtocnfmform',
    padding: '5px 25px',
    modal: true,
    resizable: false,
    layout     : 'anchor',
    autoScroll : true,
    width: Constants.ViewportWidth*0.593,
    scrollable: 'y',
    maxHeight: 550,
    
   items:[{
    xtype: 'form',
    width: '100%',
    cls:'probationtocnnfmform',
    layout: {
        type: 'vbox'
    },
        
        items: [{
            xtype:'combobox',
            fieldLabel: 'Project Name',
            store:{
                type:'projectdashboardstore'
            },
            displayField: 'name',
            // valueField:'project_id',
            name:'projectname',
            padding:'20 0 0 20',
            allowBlank: false,            
        },{
            xtype: 'textarea',
            fieldLabel: 'Primarily Identified Skill Gap (To be filled by Mentor) :',
            labelAlign: "top",
            name:'skillgap',
            allowBlank: false,
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Specify the Objectives/ Tasks  to be achieved by the Probationer:',
            name:'objectives_to_be_acheived',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Mention the objectives achieved by the probationer in the given duration:',
            name:'objectives_acheived',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'Summarize the employee’s performance and progress in the given duration:',
            name:'performance_summary',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'If Good - Provide suggestions for further improvement',
            name:'suggestions',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype: 'textarea',
            fieldLabel: 'If Not so Good - HR to initiate discussion with Probationer and proceed with next process and share comments below',
            name:'hr_discussion',
            allowBlank: false,
            labelAlign: "top",
            labelStyle: "height:25px",
            padding:'20 0 0 20'            
        },{
            xtype:'combobox',
            fieldLabel: 'Status',
            store: ['Done','Pending'],
            name:'status',
            padding:'20 0 0 20',
            allowBlank: false           
        }],
        buttons:[{
            text:'Clear',
            scale:'medium',
            handler:'onClearProbationToCnfmForm'
        },{
            text:'Submit',
            scale:'medium',
            // formBind: true,
            // disabled: true,
            handler:'onSubmitProbationToCnfmForm'
        }]
    }] 
  });