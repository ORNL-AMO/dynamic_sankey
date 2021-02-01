 var mytitle;
 var color = "white";
 var numNode =1;
 var numLink =1;
 var myLabel = [];
 var numSource = [];
 var dest = [];
 var linkVal= [];
 var nodeColor= [];
 var linkColor = [];

 function newTitle()
{
	mytitle = document.getElementById("title").value;
}

function chartColor()
{
	color = document.getElementById("colorPicker").value;
}

function newLabel(numN)
{
	myLabel[numN]=document.getElementById("label"+String(numN)).value;
}
function newNodeColor(numN)
{
	nodeColor[numN]=document.getElementById("nodeColor"+String(numN)).value;
}

function newLinkColor(numL)
{
	linkColor[numL]=document.getElementById("linkColor"+String(numL)).value;
}

function newSource(numL)
{
	numSource[numL]=document.getElementById("source"+String(numL)).value;
}

function newDest(numL)
{
	dest[numL]=document.getElementById("dest"+String(numL)).value;
}	

function newLinkVal(numL)
{
	linkVal[numL]=document.getElementById("linkVal"+String(numL)).value;
}

function deleteLink(numL)
{
	document.getElementById("Link"+numL).parentNode.removeChild(document.getElementById("Link"+numL));
	numSource[numL]=null;
	dest[numL]=null;
	linkVal[numL]=null;
}

function deleteINode(numN)
{
	document.getElementById("Node"+numN).parentNode.removeChild(document.getElementById("Node"+numN));
	myLabel[numN]= null;
}

function addNode()
{
    var makeInputs = document.getElementById("makeInputs");

	var newNode = document.createElement("td");
	newNode.setAttribute("id", "Node"+numNode);
    newNode.innerHTML = "<div class='col-sm-2' id='node"+numNode+">"+
			"<div style='width: 250px;  display: inline-block;'>"+
				"<table class='table table-bordered' style='margin: 0px;'>"+
					"<tbody>"+
						"<tr id='inputs'>"+
							"<td style='width:120px' class='text-center'>"+
								"<DIV align='right'> <button class='btn btn-secondary' onclick='deleteINode("+numNode+")' style='background-color: #8f3236'><span class='glyphicon glyphicon-remove'></span></button></DIV>" +
								"<h3 style='margin-top: 5px'>Node "+numNode+"</h3>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Name</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newLabel("+numNode+")' style='width: 178px' id='label"+String(numNode)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Value</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 178px'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 178px'>"+
								"</div>"+
									"<input type='color' class='inp' id='nodeColor"+numNode+"' onchange = 'newNodeColor("+numNode+")' style='width: 178px'>"+
							"</td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>";
	
	
    makeInputs.appendChild(newNode);
    numNode++;
}

function addLink()
{
    var makeLinks = document.getElementById("makeLinks");

	var newLink = document.createElement("td");
	newLink.setAttribute("id", "Link"+numLink);
    newLink.innerHTML = "<div class='col-sm-2' id='link"+numLink+"'>"+
			"<div style='width: 285px;  display: inline-block;'>"+
				"<table class='table table-bordered' style='margin: 0px;'>"+
					"<tbody>"+
						"<tr id='inputs'>"+
							"<td style='width:120px' class='text-center'>"+
								"<DIV align='right'> <button class='btn btn-secondary' onclick='deleteLink("+numLink+")' style='background-color: #8f3236'><span class='glyphicon glyphicon-remove'></span></button></DIV>" +
								"<h3 style='margin-top: 5px'>Link "+numLink+"</h3>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Source #</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newSource("+numLink+")' style='width: 238px' id='source"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Destination #</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newDest("+numLink+")' style='width: 238px' id='dest"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Value</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newLinkVal("+numLink+")' style='width: 238px'id='linkVal"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 238px'>"+
								"</div>"+
								"<input type='color' class='inp' id='linkColor"+numLink+"' onchange = 'newLinkColor("+numLink+")' style='width: 238px'>"+
							"</td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>"+
	"</div>";
	
    makeLinks.appendChild(newLink);
    numLink++;
}

function buildSvgArrows() 
{
    const rects = g.querySelectorAll('.node-rect');
    const arrowOpacity = '0.9';
    const arrowShape = 'polygon(100% 50%, 0 0, 0 100%)'

	for (let i = 0; i < rects.length; i++) 
	{
	  if (!g.connectingNodes.includes(i)) 
	  {
        const height = rects[i].getAttribute('height');
        const defaultY = rects[i].getAttribute('y');

        rects[i].setAttribute('y', `${defaultY - (height / 2.75)}`);
        rects[i].setAttribute('style', `width: ${height}px; height: ${height * 1.75}px; clip-path:  ${arrowShape}; 
         stroke-width: 0.5; stroke: rgb(255, 255, 255); stroke-opacity: 0.5; fill-opacity: ${arrowOpacity};`);
      }
	}
}

function renderSankey()
{
    var data = [{
    type: "sankey",
        arrangement: "snap",
        node:{
			label: myLabel,
			color: nodeColor,
           // x: [0.2, 0.2, 0.5, 0.7, 0.3, 0.5],
           // y: [0.7, 0.5, 0.2, 0.4, 0.2, 0.3],
            pad:100}, // 10 Pixels
        link: {
            source: numSource,
            target: dest,
			value: linkVal,
			color: linkColor}
        }]

    var layout = {
		"title": mytitle,
		paper_bgcolor: color
	}

	Plotly.newPlot('myDiv', data, layout)
	//buildSvgArrows();
}
