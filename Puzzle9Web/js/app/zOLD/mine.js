/**
 * Created by jessebstone on 9/22/15.
 */

define(['./inventory','./upgrade_items','./mining_control'],function(inventory,upgradeitems,miningcontrol) {

    // mine_attr has the following attributes:
    ////  mining.difficulty - essentially how long it takes to complete one 'mining cycle'
    ////  mining.value - how many btc's are received after each cycle
    ////  mining.active: true for active mining and false for inactive (to prevent multiple simultaneous firings)

    var mine_attr = {};
    var servers=[];
    var change_btc_miner;

    var init = function(change_btc){

        //create button and div for progress line FOR LOCAL CPU
        $('#mine').append('<div id=mine_button><i class="fa fa-server"></i></div><div id=line_div>CPU</div>');

        // initialize mine_attr variables
        mine_attr.difficulty=0;
        mine_attr.value=1;
        mine_attr.active=false;
        mine_attr.cpu_default=4;

        inventory.register_item('bitcoin');

        // initialize the servers and the server divs FOR REMOTE COMPUTERS

        for (i=0;i<6;i++){

            servers.push(new upgradeitems.Server(i));
            $('#mine').append('<div class=mine_server id=miner'+ i.toString()+'></div>');

        }

        change_btc_miner=change_btc;

        //pass mine attr and servers to mining_control...
        miningcontrol.init(mine_attr,servers, change_btc_miner);

        // assign handler to mine button on main mine page...
        $('#mine_button').click(function(){

        if(mine_attr.active){return;}

        miningcontrol.local_mining_progress(change_btc);



    })

};




    return{init:init,
           servers:servers,
            servers_length:servers.length
            //modify_server:modify_server
    }


});