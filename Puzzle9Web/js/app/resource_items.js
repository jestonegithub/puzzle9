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


        },

        remove_resource: function (num_removed){

            if(this.num >= num_removed) {this.num -= num_removed};

        }


    };



    var resources_table = {

        user_info: {

            name:'user data'
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

        trade_sec: {

            name:'trade secrets'
        },

        dip_intel: {

            name:'foreign intel'

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


    return{

        //pills:pills,
        //user_info:user_info,
        //passwords:passwords,
        //bots:bots
    }


});