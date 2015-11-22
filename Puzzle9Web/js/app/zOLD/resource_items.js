/**
 * Created by jessebstone on 10/26/15.
 */

define(['./inventory','./ewallet'],function(inventory,ewallet) {


    //var pills = new Resource('pills');
    //var user_info = new Resource('user_info');
    //var passwords = new Resource('passwords');
    //var bots = new Resource('bots');



    // Resource 'class'
    function Resource(resource_type) {

        this.resource_type = resource_type;
        this.name = resources_table[resource_type]['name'];
        this.num = 0;



    };

    Resource.prototype = {
        constructor: Resource,
        item_type: "Resource",
        available: true,
        register_resource: function(){
          inventory.register_item(this.resource_type)
        },
        add_resource: function (num_added) {

            this.num += num_added;
            inventory.update_item(this.resource_type,this.num);


        },

        remove_resource: function (num_removed){

            if(this.num >= num_removed) {this.num -= num_removed};

        }


    };



    var resources_table = {

        emails: {

            name:'emails'
        },

        pass: {

            name:'passwords'
        },

        bots: {

            name:'bots'
        },

        pills: {

            name:'pills'
        },

        trade: {

            name:'trade secrets'
        },

        intel: {

            name:'foreign intel'

        },
        docs:{

            name:'passports'

        },

        exploits: {

            name:'exploits'
        },

        silicon: {

            name:'silicon'
        },

        chips: {

            name: 'chips'

        }


    };


    //resource instances
    var emails = new Resource('emails');
    var pass = new Resource('pass');
    var pills = new Resource('pills');
    var docs = new Resource('docs');
    var intel = new Resource('intel');
    var trade = new Resource('trade');


    return{

        emails:emails,
        pass:pass,
        pills:pills,
        docs:docs,
        trade:trade,
        intel:intel
    }


});