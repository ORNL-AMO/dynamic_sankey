 var mytitle;
 var color = "white";
 var numNode =1;
 var numLink =1;
 var myLabel = [];
 var numSource = [];
 var dest = [];
 var linkVal= [];
 var nodeColor = [];
 var tempNodeColor =[];
 var linkColor = [];
 var arrows = false;
 var hasColorGradient =false;
 var startColorGradient = '#1E00FF';
 var endColorGradient ='#FF0000';

 function newTitle()
{
	mytitle = document.getElementById("title").value;
}

function hasArrows(hasArrows)
{
	arrows = hasArrows;
}

function chartColor()
{
	color = document.getElementById("colorPicker").value;
}

function startColor()
{
	startColorGradient = document.getElementById("startColor").value;
}

function endColor()
{
	endColorGradient = document.getElementById("endColor").value;
}

function newLabel(numN)
{
	myLabel[numN]=document.getElementById("label"+String(numN)).value;
}

function newNodeColor(numN)
{
	nodeColor[numN]=document.getElementById("nodeColor"+String(numN)).value;
}

function ChangeGradientNodeColor()
{
	if(hasColorGradient)
	{
		for(let i = 1; i < nodeColor.length; i++)
		{
			if(numSource.includes(String(i)))
			{
				tempNodeColor[i] =startColorGradient;
			}
			else
			{
				tempNodeColor[i] =endColorGradient;
			}
		}
	}
	else
	{
		for(let i = 1; i < nodeColor.length; i++)
		{
			tempNodeColor[i] = nodeColor[i];
		}
	}
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
	linkColor[numLink]=null;
}

function deleteINode(numN)
{
	document.getElementById("Node"+numN).parentNode.removeChild(document.getElementById("Node"+numN));
	myLabel[numN]= null;
	nodeColor[numLink]=null;
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
									"<input type='color' class='inp' id='nodeColor"+numNode+"' onchange = 'newNodeColor("+numNode+")' value='#1E00FF' style='width: 178px'>"+
							"</td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>";
		
	makeInputs.appendChild(newNode);
	nodeColor[numNode] = '#1E00FF';
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
								"<input type='color' class='inp' id='linkColor"+numLink+"' onchange = 'newLinkColor("+numLink+")' value='#EFECEC' style='width: 238px'>"+
							"</td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>"+
	"</div>";
	
	makeLinks.appendChild(newLink);
	linkColor[numLink] = '#EFECEC';
    numLink++;
}

function addColorGradient()
{
	if(!hasColorGradient)
	{
		var ColorOption = document.getElementById("colorGradient");

		var newGradient = document.createElement("text");
		newGradient.setAttribute("id", "selectColors");
		newGradient.innerHTML = "<br><h5>Start Color</h5>"+
		"<input type='color' class='inp' id='startColor' onchange = 'startColor()' value='#1E00FF' style='width: 238px'>"+
		"<h5>End Color</h5>"+
		"<input type='color' class='inp' id='endColor' onchange = 'endColor()' value='#FF0000' style='width: 238px'></input>";

		ColorOption.appendChild(newGradient);
		hasColorGradient = true;
	}

}

function removeColorGradient()
{
	if(hasColorGradient)
	{
		document.getElementById("selectColors").parentNode.removeChild(document.getElementById("selectColors"));
		hasColorGradient = false;
		startColorGradient = '#1E00FF';
 		endColorGradient ='#FF0000';
	}
}

function buildSvgArrows() 
{
    const rects = document.querySelectorAll('.node-rect');
    const arrowOpacity = '0.9';
    const arrowShape = 'polygon(100% 50%, 0 0, 0 100%)'
	var endNodeColor;

	for (let i = 0; i < rects.length; i++) 
	{
	  if (!numSource.includes(String(i+1))) 
	  {
		if(hasColorGradient)
		{
			endNodeColor = endColorGradient;
		}
		else
		{
			endNodeColor = nodeColor[i+1];
		}
        const height = rects[i].getAttribute('height');
		//const defaultY = rects[i].getAttribute('y');
		//const colorG = rects[i].getAttribute('fill');

        //rects[i].setAttribute('y', `${defaultY}`);
        rects[i].setAttribute('style', `width: ${height*.25}px; height: ${height}px; clip-path:  ${arrowShape}; 
         stroke-width: 0.5; stroke: rgb(255, 255, 255); stroke-opacity: 0.5; fill: ${endNodeColor}; fill-opacity: ${arrowOpacity};`);
      }
	}
}

function addGradientElement()
{
    const mainSVG = document.querySelector('.main-svg')
    const svgDefs = document.querySelector('defs')

    svgDefs.innerHTML = `
    <linearGradient id="psatLinkGradient">
      <stop offset="10%" stop-color=${startColorGradient} />
      <stop offset="100%" stop-color=${endColorGradient} />
    </linearGradient>
    `;
    // Insert our gradient Def
	mainSVG.appendChild(svgDefs);
	
	const links = document.querySelectorAll('.sankey-link');
	for (let i = 0; i < links.length; i++) 
	{
		if(!numSource.includes(String(dest[i+1])))
		{
			links[i].setAttribute('style', `fill: ${"url(#psatLinkGradient)"};`);
		}
		else
		{
			links[i].setAttribute('style', `fill: ${startColorGradient};`);
		}
	}
  }


function renderSankey()
{
	ChangeGradientNodeColor();

    var data = [{
    type: "sankey",
        //arrangement: "snap",
        node:{
			label: myLabel,
			color: tempNodeColor,
           // x: [0.2, 0.2, 0.5, 0.7, 0.3, 0.5],
           // y: [0.7, 0.5, 0.2, 0.4, 0.2, 0.3],
            pad:10}, // 10 Pixels
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

	if(arrows)
		buildSvgArrows();

	if(hasColorGradient)
		addGradientElement();
}