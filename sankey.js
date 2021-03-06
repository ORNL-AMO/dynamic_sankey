const convert = require('convert-units');
 var mytitle;
 var measures = 'length';
 var primaryUnit;
 var color = "white";

 //used to make the indexs of the sankey arrays
 var numNode =1;
 var numLink =1;

 //parrel node arrays to pass to render function
 var nodeLabel = [];
 var nodeName = [];
 var nodeValue =[];
 var nodeUnits = [];
 var conNodeValue =[];
 var nodeColor = [];
 var tempNodeColor =[];

 //parrel link arrays to pass to render function
 var numSource = [];
 var dest = [];
 var linkVal= [];
 var linkUnits = [];
 var conLinkValue =[];
 var linkColor = [];

 //sankey options set to default
 var arrows = false;
 var hasColorGradient =false;
 var startColorGradient = '#1E00FF';
 var endColorGradient ='#FF0000';
 
 // loads lists on startup
 displayMeasures();
 diplaymainUnitList();
 
 // dropdown list of measurments
 function displayMeasures()
 {
	var select = document.getElementById("measures"); 
	var options = convert().measures();
	
	for(var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}

 }
 
 //dropdown list for the primary units
 function diplaymainUnitList()
 {
	var op = document.getElementById("unitOptions");
	var length = op.options.length;
	for (i = length-1; i >= 0; i--)
	{
		op.options[i] = null;
	}

	var select = document.getElementById("unitOptions"); 
	var options = convert().possibilities(measures);
	primaryUnit = options[0];
	for(var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
 }

// takes in user input for the title of chart
 function newTitle()
{
	mytitle = document.getElementById("title").value;
}

// takes in measures from the user and changes all unit lists
function newmeasures()
{
	measures =document.getElementById("measures").value;
	diplaymainUnitList();

	for(let i = 1; i < numNode; i++)
	{
		if(nodeColor[i]!=null)
		{
			nodeUnitList(i);
			convertNodeUnits(i);
			newLabel(i);
		}
	}
	for(let i = 1; i < numLink; i++)
	{
		if(linkColor[i]!=null)
		{
			linkUnitList(i);
			convertLinkUnits(i);
		}
	}
}

//takes in user input for primary units and then reconverts all conversions
function newPrimaryUnit()
{
	primaryUnit = document.getElementById("unitOptions").value;

	for(let i = 1; i < conNodeValue.length; i++)
	{
		if(conNodeValue[i]!=null)
			convertNodeUnits(i);
	}
	for(let i = 1; i < conLinkValue.length; i++)
	{
		if(conLinkValue[i]!=null)
			convertLinkUnits(i);
	}
}

//takes in user option for arrows or nodes
function hasArrows(hasArrows)
{
	arrows = hasArrows;
}

//sets the background color to user input
function chartColor()
{
	color = document.getElementById("colorPicker").value;
}

// sets the starting color of the Color Gradient to user input
function startColor()
{
	startColorGradient = document.getElementById("startColor").value;
}

// sets the ending color of the Color Gradient to user input
function endColor()
{
	endColorGradient = document.getElementById("endColor").value;
}

//makes the label for the nodes
function newLabel(numN)
{
	nodeLabel[numN]=nodeName[numN]+" "+
	nodeValue[numN]+nodeUnits[numN];
}

// sets the node name to user input and remakes node label
function newNodeName(numN)
{
	nodeName[numN]=document.getElementById("nodeName"+String(numN)).value;
	newLabel(numN);
}

// takes in user input of the node value, remakes node label and coverts the value
function newNodeValue(numN)
{
	nodeValue[numN]=document.getElementById("nodeValue"+String(numN)).value;
	newLabel(numN);
	convertNodeUnits(numN);
}

// takes in user input of the node unit, remakes node label and coverts the node value
function newNodeUnit(numN)
{
	nodeUnits[numN]=document.getElementById("nodeUnits"+String(numN)).value;
	newLabel(numN);
	convertNodeUnits(numN);
}

// takes in user input of the link unit and coverts the link value
function newLinkUnit(numL)
{
	linkUnits[numL]=document.getElementById("linkUnits"+String(numL)).value;
	convertLinkUnits(numL);
}

// coverts the node value to the primary units
function convertNodeUnits(numN)
{
	conNodeValue[numN] = String(convert(nodeValue[numN]).from(nodeUnits[numN]).to(primaryUnit));
	document.getElementById('convertedNodeUnits'+String(numN)).value = conNodeValue[numN] +" "+ primaryUnit;
}

// coverts the link value to the primary units
function convertLinkUnits(numL)
{
	conLinkValue[numL] = String(convert(linkVal[numL]).from(linkUnits[numL]).to(primaryUnit));
	document.getElementById('convertedLinkUnits'+String(numL)).value = conLinkValue[numL] +" "+ primaryUnit;
}

//sets the node color to user input
function newNodeColor(numN)
{
	nodeColor[numN]=document.getElementById("nodeColor"+String(numN)).value;
}

// changes the node colors if the color gradent option is selected
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

//sets the link color to user input
function newLinkColor(numL)
{
	linkColor[numL]=document.getElementById("linkColor"+String(numL)).value;
}

//takes in the source node from user input(can be the node number or its name)
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

//takes in the destination node from user input(can be the node number or its name)
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

// takes in user input of the link value and coverts the value
function newLinkVal(numL)
{
	linkVal[numL]=document.getElementById("linkVal"+String(numL)).value;
	convertLinkUnits(numL);
}

//deletes the node UI from the page and clears the elements of the parallel link arrays
function deleteLink(numL)
{
	document.getElementById("Link"+numL).parentNode.removeChild(document.getElementById("Link"+numL));
	numSource[numL]=null;
	dest[numL]=null;
	linkVal[numL]=null;
	linkColor[numL]=null;
	conLinkValue[numL]=null;
}

//deletes the link UI from the page and clears the elements of the parallel link arrays
function deleteINode(numN)
{
	document.getElementById("Node"+numN).parentNode.removeChild(document.getElementById("Node"+numN));
	nodeLabel [numN] = null;
	nodeName[numN] = null;
	nodeValue[numN] = null;
	nodeUnits[numN] = null;
	nodeColor[numN]=null;
	conNodeValue[numN]=null;
}

//adds the node UI to the page and sets color and unit default values
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
									"<select type='text' class='form-control' aria-describedby='basic-addon1' onchange='newNodeUnit("+numNode+")' style='width: 178px' id='nodeUnits"+String(numNode)+"'></select>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>converted Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' style='width: 178px' id='convertedNodeUnits"+String(numNode)+ "' readonly='true'>"+
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
	nodeUnitList(numNode);
    numNode++;
}

//diplays unit list for each node
function nodeUnitList(numN)
{
	var op = document.getElementById("nodeUnits"+String(numN));
	var length = op.options.length;
	for (i = length-1; i >= 0; i--)
	{
		op.options[i] = null;
	}

	var unitSelect = document.getElementById("nodeUnits"+String(numN)); 
	var unitOptions = convert().possibilities(measures);
	nodeUnits[numN]=unitOptions[0];
	for(var i = 0; i < unitOptions.length; i++)
	{
		var opt = unitOptions[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		unitSelect.appendChild(el);
	}
}

//adds the link UI to the page and sets color and unit default values
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
									"<select type='text' class='form-control' aria-describedby='basic-addon1' onchange='newLinkUnit("+numLink+")' style='width: 238px' id='linkUnits"+String(numLink)+"'></select>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>converted Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' style='width: 238px' id='convertedLinkUnits"+String(numLink)+ "' readonly='true'>"+
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
	linkUnitList(numLink);
    numLink++;
}

//diplays unit list for each link
function linkUnitList(numL)
{
	var op = document.getElementById("linkUnits"+String(numL));
	var length = op.options.length;
	for (i = length-1; i >= 0; i--)
	{
		op.options[i] = null;
	}

	var linkSelect = document.getElementById("linkUnits"+String(numL)); 
	var linkUnitOptions = convert().possibilities(measures);
	linkUnits[numL]=linkUnitOptions[0];
	for(var i = 0; i < linkUnitOptions.length; i++)
	{
		var opt = linkUnitOptions[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		linkSelect.appendChild(el);
	}
}

//makes the UI for the gradent color options to the page and set hasColorGradient to true
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

//removes the UI for the gradent color options from the page and set hasColorGradient to false
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

//changes the end nodes from rectangles to triangles
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

//adds color gradent to the end links
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

// adds all the units coming to and from each node and compares it the the nodes value
//alerts the user if the values are not equal
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
		checkSourceValue[numSource[i]]= checkSourceValue[numSource[i]]+parseFloat(conLinkValue[i]);
		checkDestValue[dest[i]]= checkDestValue[dest[i]]+parseFloat(conLinkValue[i]);
	}

	for (let i = 1; i < conNodeValue.length; i++)
	{
		if(!(conNodeValue[i]==checkSourceValue[i])&&numSource.includes(String(i)))
		{
			alertMessage=alertMessage.concat(nodeName[i]+" has a value of "+conNodeValue[i]+primaryUnit+", but has "+ checkSourceValue[i]+primaryUnit+" flowing from it.\n");
			numericC = true;
		}
		if(!(conNodeValue[i]==checkDestValue[i])&&dest.includes(String(i)))
		{
			alertMessage=alertMessage.concat(nodeName[i]+" has a value of "+conNodeValue[i]+primaryUnit+", but has " + checkDestValue[i]+primaryUnit+" flowing to it.\n");
			numericC = true;
		}
	}

	if(numericC)
	{
		alert(alertMessage);
	}
}

//takes all global varables and uses them to render the sankey
function renderSankey()
{
	ChangeGradientNodeColor();

    var data = [{
    type: "sankey",
        //arrangement: "snap",
		valuesuffix: primaryUnit,
        node:{
			label: nodeLabel,
			color: tempNodeColor,
           // x: [0.2, 0.2, 0.5, 0.7, 0.3, 0.5],
           // y: [0.7, 0.5, 0.2, 0.4, 0.2, 0.3],
            pad:10}, // 10 Pixels
        link: {
            source: numSource,
            target: dest,
			value: conLinkValue,
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