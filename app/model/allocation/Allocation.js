
Ext.define('DDO.model.allocation.Allocation', {
	extend: 'Ext.data.Model',
	fields: [
        "firstname",
        "lastname",
        {
            name: 'fullName',
            calculate: function (data) {
                return data.firstname + ' ' + data.lastname;
            }
        },
        "name",	
        {
            name : "allocation_factor",
            convert : function (value,record){
                if(!Ext.isEmpty(value)){
                    return parseFloat(value).toFixed(2);
                }
            }
        }
    ]
});



