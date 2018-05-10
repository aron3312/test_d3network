
				var width = 1400,
					height = 1000;

				var svg = d3.select("body").append("svg")
					.attr("width", width)
					.attr("height", height);


				 d3.json("student.json", function (json) {
					var force = d3.layout.force()
						.gravity(.05)
						.distance(function(d) { return 400/Math.sqrt(d.weight); })
						.charge(-100)
						.size([width, height]);

					force
						.nodes(json.nodes)
						.links(json.links)
						.start();

					var link = svg.selectAll(".link")
						.data(json.links)
						.enter().append("line")
						.attr("class", "link")
						.style("stroke-width", 1);

					var node = svg.selectAll(".node")
						.data(json.nodes)
						.enter().append("g")
						.attr("class", "node")
						.call(force.drag);

					node.append("circle")
						.attr("r",function(d) {
									var count = 0;
									for(i = 0; i < json.links.length ;i++){

										if(d.name.indexOf(json.links[i].source.name) != -1 || d.name.indexOf(json.links[i].target.name) != -1){
											count++;
										}
									}
									return count*2.5;
						});

					node.append("text")
						.attr("dx", 12)
						.attr("dy", ".35em")
						.text(function(d) { return d.name });

					force.on("tick", function() {
						link
							.attr("x1", function(d) { return d.source.x; })
							.attr("y1", function(d) { return d.source.y; })
							.attr("x2", function(d) { return d.target.x; })
							.attr("y2", function(d) { return d.target.y; });




					node.on("click", function(d){
							node = svg.selectAll(".node")
									.style({opacity:'1'});
							link = svg.selectAll(".link")
									.style({opacity:'1'});
							var name = d.name
							node.filter(function (d) { return d.name !== name})
								.style({opacity:'0.5'});
							for(i = 0; i < json.links.length ;i++){
								if(json.links[i].source.name === name){
									node.filter(function (d) { return d.name === json.links[i].target.name; })
										.style({opacity:'1'});
								}
								if(json.links[i].target.name === name){
									node.filter(function (d) { return d.name === json.links[i].source.name; })
										.style({opacity:'1'});
								}
							}

						});
		      $('#clear').click(function(){
		            node = svg.selectAll(".node")
		                 .style({opacity:'1'})
		        })
					node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
					});
				})
				;
