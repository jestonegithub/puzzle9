/**
 * Created by jessebstone on 10/13/15.
 */

define(['./feed','./timer','./ewallet'],function(feed,timer,ewallet) {


    // info

    var rbn_info = {name: "Romanian Business Network",
                    handle: "@RBN",
                    billing_cost:5,
                    billing_cycle:10};




    // SCRIPT
    var startup_tweets = {

        os_blurb: "All of our remote clients are now running our new Cryptonite OS",
        //btc_blurb: "Great article on the resiliency of bitcoin over at WSJ.  Preaching to the choir here.",
        btc_hint: "Want to get bitcoins?  For our clients, creating an account is as easy as 'install bit-o-matic'. "


    };




    // functionality

    var actions = {


        tweet:feed.tweet,
        billing: {
            update_cycle:
                function(){

                    var today=timer.get_game_date();
                    var progress=today%rbn_info.billing_cycle;
                    if (progress === 2) {

                        //WARNING (via twitter)?

                    }

                    if (progress === 0) {

                        //DISABLE FUNCTIONALITY

                    }

                },
            receive_payment:function(){

                ewallet.change_btc(rbn_info.billing_cost);

            }
        }


    };



    // performance

    var init_actor = function(){

        var i=0;
        for (var key in startup_tweets) {

            var inter = function() {

                var key2=key;

                setTimeout(function () {
                    actions.tweet(rbn_info.handle, startup_tweets[key2])
                }, i * 4000);
                i++;
            };

            inter();
        }

    };


    return{init_actor:init_actor}



});