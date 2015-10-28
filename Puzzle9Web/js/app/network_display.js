/**
 * Created by jessebstone on 10/19/15.
 */

define(['d3'],function(d3) {


    var display_network = function(){


        //create display window in inventory div

        $('#game_wrapper').append('<div id="network_window"></div>')


        //create network chart

        var width = 600,
            height = 700;

        var color = d3.scale.category20b();


        var force = d3.layout.force()
            .linkDistance(3)
            .linkStrength(2)
            .size([width, height]);

        var svg = d3.select("#network_window").append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("../data/test_data.json", function(error, graph) {
            if (error) throw error;

            var nodes = graph.nodes.slice(),
                links = [],
                bilinks = [];

            graph.links.forEach(function(link) {
                var s = nodes[link.source],
                    t = nodes[link.target],
                    i = {}; // intermediate node
                nodes.push(i);
                links.push({source: s, target: i}, {source: i, target: t});
                bilinks.push([s, i, t]);
            });

            force
                .nodes(nodes)
                .links(links)
                .start();

            var link = svg.selectAll(".link")
                .data(bilinks)
                .enter().append("path")
                .attr("class", "link");

            var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("circle")
                .attr("class", "node")
                .attr("r", 5)
                .style("fill", function(d) { return color(d.group); })
                .call(force.drag);

            node.append("title")
                .text(function(d) { return d.name; });

            force.on("tick", function() {
                link.attr("d", function(d) {
                    return "M" + d[0].x + "," + d[0].y
                        + "S" + d[1].x + "," + d[1].y
                        + " " + d[2].x + "," + d[2].y;
                });
                node.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
            });
        });



    };



    return{display_network:display_network}

});