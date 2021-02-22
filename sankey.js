var mytitle;
 var color = "white";
 var numNode =1;
 var numLink =1;
 var nodeLabel = [];
 var nodeName = [];
 var nodeValue =[];
 var nodeUnits = [];
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
	nodeLabel[numN]=nodeName[numN]+" "+
	nodeValue[numN]+nodeUnits[numN];
}

function newNodeName(numN)
{
	nodeName[numN]=document.getElementById("nodeName"+String(numN)).value;
	newLabel(numN);
}

function newNodeValue(numN)
{
	nodeValue[numN]=document.getElementById("nodeValue"+String(numN)).value;
	newLabel(numN);
}

function newNodeUnit(numN)
{
	nodeUnits[numN]=document.getElementById("nodeUnits"+String(numN)).value;
	newLabel(numN);
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
	if(!isNaN(document.getElementById("source"+String(numL)).value))
	{
		console.log("true source");
		numSource[numL]=document.getElementById("source"+String(numL)).value;
	}
	else
	{
		console.log("false source");
		numSource[numL]=String(nodeName.indexOf(document.getElementById("source"+String(numL)).value));
		console.log(numSource[numL]);
	}
}

function newDest(numL)
{
	if(!isNaN(document.getElementById("dest"+String(numL)).value))
	{
		console.log("true dest");
		dest[numL]=document.getElementById("dest"+String(numL)).value;
	}
	else
	{
		console.log("false dest");
		dest[numL]=String(nodeName.indexOf(document.getElementById("dest"+String(numL)).value));
		console.log(dest[numL]);
	}
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
	linkColor[numL]=null;
}

function deleteINode(numN)
{
	document.getElementById("Node"+numN).parentNode.removeChild(document.getElementById("Node"+numN));
	nodeLabel [numN] = null;
	nodeName[numN] = null;
	nodeValue[numN] = null;
	nodeUnits[numN] = null;
	nodeColor[numL]=null;
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
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newNodeName("+numNode+")' style='width: 178px' id='nodeName"+String(numNode)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Value</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newNodeValue("+numNode+")' style='width: 178px' id='nodeValue"+String(numNode)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='newNodeUnit("+numNode+")' style='width: 178px' id='nodeUnits"+String(numNode)+"'>"+
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
	
	var k =1;
	for (let i = 0; i < rects.length; i++) 
	{
	  while(nodeColor[i+k] == null)
	  {
		k++;
	  }

	  if (!numSource.includes(String(i+k))) 
	  {
		if(hasColorGradient)
		{
			endNodeColor = endColorGradient;
		}
		else
		{
			endNodeColor = nodeColor[i+k];
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
	
	var k = 1;
	const links = document.querySelectorAll('.sankey-link');	
	for (let i = 0; i < links.length; i++) 
	{
		while(dest[i+k]==null)
		{
			k++;
		}
		if(!numSource.includes(String(dest[i+k])))
		{
			links[i].setAttribute('style', `fill: ${"url(#psatLinkGradient)"};`);
		}
		else
		{
			links[i].setAttribute('style', `fill: ${startColorGradient};`);
		}
	}
  }

function numericCheck()
{
	let checkSourceValue = [];
	let checkDestValue = [];
	let alertMessage = "Warning!\n\n";
	let numericC = false;

	for (let i = 1; i < nodeValue.length; i++)
	{
		checkSourceValue[i]= parseFloat(0);
		checkDestValue[i]= parseFloat(0);
	}

	for (let i = 1; i < linkVal.length; i++)
	{
		checkSourceValue[numSource[i]]= checkSourceValue[numSource[i]]+parseFloat(linkVal[i]);
		checkDestValue[dest[i]]= checkDestValue[dest[i]]+parseFloat(linkVal[i]);
	}

	for (let i = 1; i < nodeValue.length; i++)
	{
		if(!(nodeValue[i]==checkSourceValue[i])&&numSource.includes(String(i)))
		{
			alertMessage=alertMessage.concat(nodeName[i]+" has a value of "+nodeValue[i]+nodeUnits[i]+", but has "+ checkSourceValue[i]+nodeUnits[i]+" flowing from it.\n");
			numericC = true;
		}
		if(!(nodeValue[i]==checkDestValue[i])&&dest.includes(String(i)))
		{
			alertMessage=alertMessage.concat(nodeName[i]+" has a value of "+nodeValue[i]+nodeUnits[i]+", but has " + checkDestValue[i]+nodeUnits[i]+" flowing to it.\n");
			numericC = true;
		}
	}

	if(numericC)
	{
		alert(alertMessage);
	}
}

function renderSankey()
{
	ChangeGradientNodeColor();

    var data = [{
    type: "sankey",
        //arrangement: "snap",
        node:{
			label: nodeLabel,
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
	{		
		addGradientElement();

		var myPlot = document.getElementById('myDiv');
		myPlot.on('plotly_afterplot', function(){
			addGradientElement();
		});
	}
	numericCheck();
}