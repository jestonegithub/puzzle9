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

        for (i=0;i<5;i++){

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
    //
    //// displays mining progress using progress bar and call the update button when done.
    //
    //var local_mining_progress = function(change_btc){
    //
    //    //load the fancy button stuff for mining button
    //
    //    mine_attr.active=true;
    //
    //    var progress_timer=1000*mine_attr.cpu_default+mine_attr.difficulty*500;
    //
    //    var line = new progressbar.Line('#line_div',{color:'#FCB03C',strokeWidth:0.5});
    //    line.animate(0.5,{duration:progress_timer,easing:'linear'},function(){
    //
    //        change_btc(mine_attr.value);
    //        line.destroy();
    //        mine_attr.active=false;
    //
    //
    //
    //    });
    //
    //};
    //
    //var remote_mining_progress = function(interval){
    //
    //    //load the fancy button stuff for mining button
    //
    //    var progress_timer=interval+mine_attr.difficulty*500;
    //
    //    var line = new progressbar.Line('#line_div',{color:'#FCB03C',strokeWidth:0.5});
    //    line.animate(0.5,{duration:progress_timer,easing:'linear'},function(){
    //
    //        change_btc(mine_attr.value);
    //        line.destroy();
    //
    //
    //
    //
    //    });
    //
    //};
    //
    //
    //
    //var modify_server = function(server){
    //
    //    var who=server.serial.toString(); //server id
    //    $('#miner'+who).text(server['values'][server['current']]); //displays which type of server is current (cpu, gpu, etc)
    //
    //
    //    timer.removeFromList('miner'+who.toString());
    //    if (server['values']['current'] != "none"){
    //        var interval = server['speeds']['current'];
    //        timer.addToList('miner'+who.toString(),remote_mining_progress,interval,interval);
    //    }
    //
    //};
    //



    return{init:init,
           servers:servers,
            servers_length:servers.length
            //modify_server:modify_server
    }


});