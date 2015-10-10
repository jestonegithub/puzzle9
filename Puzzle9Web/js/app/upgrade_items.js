/**
 * Created by jessebstone on 10/3/15.
 */

define(['./ewallet','bootstrap','./mining_control'],function(ewallet,bootstrap,miningcontrol) {


    // These are items that are upgrades to some existing game object - they cannot be transferred (but can be sold back in some cases)


    function Server(id) {

        this.current = 0;
        this.serial=id;
    };

    Server.prototype = {
        constructor:Server,
        item_type:"Server",
        values: ["none","CPU","GPU","ASIC","QPU"],
        costs: [0,100,200,300,400],
        speeds:[0,4,3,2,1],
        icon:"fa fa-server",
        cost_type:"USD",
        available:true,
        upgrade_server: function(){

            if (this.current < 4) {

                this.current+=1;
                miningcontrol.modify_server(this);


            }

        },
        downgrade_server: function() {

            if (this.current > 0) {

                this.current-=1;
                miningcontrol.modify_server(this);

            }


        }

    };


    return{Server:Server}





});