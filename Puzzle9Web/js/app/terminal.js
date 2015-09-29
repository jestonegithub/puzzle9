/**
 * Created by jessebstone on 9/18/15.
 */



define(['./controlPanel','./ewallet'],function(controlPanel,ewallet) {


    var init = function(){


        $('#home_screen').append('<div id=terminal_div>' +
        '<div id=terminal_head>user137 - bash</div>' +
        '<div id=terminal_body>' +
        '<div id=terminal_display>Last login: Sun Sep 20 00:40:14 on ttys000 </div>' +
        '<div id=terminal_input></div><div id=command_line_user>user137$</div>' +
        '<form id=form_command>'+
            '<input type="text" name="command" id="user_input">'+
            '<input type="submit" value="Submit" id="console_submit">'+
        '</form>' +
        '</div>');

        $('#terminal_div').hide();

        $('#console_submit').hide();
        $("#form_command").submit(function(e) {
            e.preventDefault();
            input_handler();

        });

    };


    //actions

    var display_file = function (file) {

        //command is 'read filename'


    };

    var install_system = function(system) {

        //command is 'sudo apt-get install bitzwallet'


    };


    //handler for calling action functions based on user input

    var input_handler = function() {

        //define a dictionary of commands -> action functions

        var action ={

            //'sudo apt-get install bitzwallet'

            test1:function(){

                ewallet.init();
                controlPanel.add_control('ewallet');
                controlPanel.ewallet_loaded=true;


            }



        };




        // read command line input
        var input1=$('#user_input').val();

        //call appropriate action function using dict.

        action['test1']();
        //cloudHack.add_control('ewallet');







    };







    return{init:init}
    //input_handler:input_handler};

});