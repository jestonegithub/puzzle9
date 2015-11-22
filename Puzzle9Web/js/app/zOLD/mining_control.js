/**
 * Created by jessebstone on 10/9/15.
 */

define(['progressbar','./inventory','./upgrade_items','./timer'],function(progressbar,inventory,upgradeitems,timer) {

    var mine_attr;
    var servers;
    var change_btc;

    var init = function(mineattr,serv,chgbtc){

        mine_attr=mineattr;
        servers=serv;
        change_btc=chgbtc;


    };

    // displays mining progress using progress bar and call the update button when done.

    var local_mining_progress = function(change_btc){

        //load the fancy button stuff for mining button

        mine_attr.active=true;

        var progress_timer=1000*mine_attr.cpu_default+mine_attr.difficulty*500;

        var line = new progressbar.Line('#line_div',{color:'#FFFFFF',strokeWidth:0.5});
        line.animate(0.8,{duration:progress_timer,easing:'linear'},function(){

            change_btc(mine_attr.value);
            line.destroy();
            mine_attr.active=false;



        });

    };

    var remote_mining_progress = function(intake){



        //load the fancy button stuff for mining button
        var interval= intake[0];
        var who=intake[1];

        var progress_timer=interval*1000+mine_attr.difficulty*500;

        var line = new progressbar.Line('#miner'+who,{color:'#FFFFFF',strokeWidth:0.5});
        line.animate(0.8,{duration:progress_timer,easing:'linear'},function(){

            change_btc(mine_attr.value);
            line.destroy();




        });

    };



    var modify_server = function(server){

        var who=server.serial.toString(); //server id
        $('#miner'+who).text(server['values'][server['current']]); //displays which type of server is current (cpu, gpu, etc)


        timer.removeFromList('miner'+who.toString());
        if (server['values']['current'] != "none"){
            var interval1 = server['speeds'][server['current']];
            console.log(interval1);
            console.log('mining-control:line75');
            timer.addToList('miner'+who.toString(),remote_mining_progress,interval1,[interval1,who]);
        }

    };



    return{init:init,
        local_mining_progress:local_mining_progress,
            modify_server:modify_server}

});