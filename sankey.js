 var mytitle;
 var numNode =1;
 var numLink =1;
 var Label = ["outlet","fan","computer","waste"];
 var Source = [];
 var dest = [];
 var linkVal= [];

 function setTitle()
{
	mytitle = document.getElementById("title").value;
}

function setLabel(numN)
{
	Label[numN]=document.getElementById("label"+String(numN)).value;
}

function setSource(numL)
{
	Source[numL]=document.getElementById("source"+String(numL)).value;
}

function setDest(numL)
{
	dest[numL]=document.getElementById("dest"+String(numL)).value;
}	

function setLinkVal(numL)
{
	linkVal[numL]=document.getElementById("linkVal"+String(numL)).value;
}

function addInput()
{
    var makeInputs = document.getElementById("makeInputs");

    var newInput = document.createElement("td");
    newInput.innerHTML = "<div class='col-sm-2'>"+
			"<div style='width: 225px;  display: inline-block;'>"+
				"<table class='table table-bordered' style='margin: 0px;'>"+
					"<tbody>"+
						"<tr id='inputs'>"+
							"<td style='width:120px' class='text-center'>"+
								"<h3 style='margin-top: 5px'>Node "+numNode+"</h3>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Name</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='setLabel("+numNode+")' style='width: 145px' id='label"+String(numNode)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Value</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 148px'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 151px'>"+
								"</div>"+
								"<div class='form-group' style='width: 208px'>"+
									"<select class='form-control' id='sel1'>"+
									  "<option>Red</option>"+
									  "<option>Blue</option>"+
									  "<option>Yellow</option>"+
									  "<option>Orange</option>"+
									  "<option>Green</option>"+
									  "<option>Blue</option>"+
									  "<option>Purple</option>"+
									  "<option>Brown</option>"+
									"</select>"+
								  "</div>"+	
							"</td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>";
	
	
    makeInputs.appendChild(newInput);
    numNode++;
}

function addLink()
{
    var makeLinks = document.getElementById("makeLinks");

    var newLink = document.createElement("td");
    newLink.innerHTML = "<div class='col-sm-2'>"+
			"<div style='width: 275px;  display: inline-block;'>"+
				"<table class='table table-bordered' style='margin: 0px;'>"+
					"<tbody>"+
						"<tr id='inputs'>"+
							"<td style='width:120px' class='text-center'>"+
								"<h3 style='margin-top: 5px'>Link "+numLink+"</h3>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Source #</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='setSource("+numLink+")' style='width: 185px' id='source"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Destination #</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='setDest("+numLink+")' style='width: 160px' id='dest"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'>Value</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='setLinkVal("+numLink+")' style='width: 207px'id='linkVal"+String(numLink)+"'>"+
								"</div>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon' id='basic-addon1'>Units</span>"+
									"<input type='text' class='form-control' aria-describedby='basic-addon1' onchange='updateDifference()' style='width: 210px'>"+
								"</div>"+
								"<div class='form-group' style='width: 267px'>"+
									"<select class='form-control' id='sel1'>"+
									  "<option>Red</option>"+
									  "<option>Blue</option>"+
									  "<option>Yellow</option>"+
									  "<option>Orange</option>"+
									  "<option>Green</option>"+
									  "<option>Blue</option>"+
									  "<option>Purple</option>"+
									  "<option>Brown</option>"+
									"</select>"+
								  "</div>"+
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

function makeSankey()
{
    var data = [{
    type: "sankey",
        arrangement: "snap",
        node:{
            label: Label, //["A", "B", "C", "D", "E", "F"],
           // x: [0.2, 0.2, 0.5, 0.7, 0.3, 0.5],
           // y: [0.7, 0.5, 0.2, 0.4, 0.2, 0.3],
            pad:10}, // 10 Pixels
        link: {
            source: Source,
            target: dest,
            value: linkVal}
        }]

    var layout = {"title": mytitle}

    Plotly.newPlot('myDiv', data, layout)
}
