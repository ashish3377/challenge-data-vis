var React = require('React')
var linmap = require('linmap')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')

// fetch the url
function getAsyncThing(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // defensive check
            if (typeof cb === "function") {
                // apply() sets the meaning of "this" in the callback
                cb.apply(xhr);
            }
        }
    };
    xhr.send();
}

module.exports = createReactClass({
  getInitialState: function() {
    return {shouldRender : false,datefg:[]};  
  },
	
    render () {
	var json;
	var component = this;
	 getAsyncThing(this.props.dataset,
     function () {
         var jsond  = JSON.parse(this.responseText);
		 component.setState({ shouldRender: true,dateg:jsond });
    }
)

 if(!this.state.shouldRender) return false
   
   var json = this.state.dateg;
    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
   
	var smaxpetalWidth = Math.max.apply(null, arr.map(function(a){return a.petalWidth;})) 
	// To find the max value of petalWidth so that it can be divided into x-axis segments
	
	var smaxpetalLength = Math.max.apply(null, arr.map(function(a){return a.petalLength;})) 
	// To find the max value of petalLength so that it can be divided into y-axis segments
  
	width =  this.props.width+ 'px'; // To get width of container defined
	height = this.props.height+ 'px'; // To get height of container defined
	
    return (<div style={{position: 'relative',color: 'rgba(255, 255, 255, 0.7)',background: '#222',border:'1px solid black',width: width,height: height}}>{arr.map((item, index) =><Datavisulation sepalLength={item.sepalLength} sepalWidth={item.sepalWidth} petalLength={item.petalLength} petalWidth={item.petalWidth} species={item.species} width={this.props.width} height={this.props.height} iter={index}  maxpetalWidth={smaxpetalWidth} maxpetalLength={smaxpetalLength}/>)}  <Righttopdata/></div>)
  
  
  }
})

//To plot the point inside the container.
class Datavisulation extends React.Component {
  
  // To add mouseout function and hide the top left result summary 
   mouseOut() {
	document.getElementById("ele").style.display = "block";
  }
  
 // To add mouseover function 
  mouseOver(indexnumber,species,petalWidth,petalLength,sepalWidth,sepalLength) {  
	document.getElementById("ele").style.display = "block";
	document.getElementById("xnumber").innerHTML = indexnumber;
	document.getElementById("xspecies").innerHTML = species;
	document.getElementById("xpetalWidth").innerHTML = petalWidth;
	document.getElementById("xpetalLength").innerHTML = petalLength;
	document.getElementById("xsepalWidth").innerHTML = sepalWidth;
	document.getElementById("xsepalLength").innerHTML = sepalLength;
    
  }
  
  render() {
  
  var petalwidthmaxvalue = this.props.maxpetalWidth; // to get container width runtime 
  var petallenghtmaxvalue = this.props.maxpetalLength; // to get container height runtime
  
  var leftorigin        	    = 0.1;
  var leftpixeldifference 		= ((this.props.width)/(petalwidthmaxvalue-0.1));
  var leftintialstate     		= 5;
  
  var bottomorigin              = 1;
  var bottompixeldifference 	= ((this.props.height)/(petallenghtmaxvalue-1));
  var bottomintialstate         = -5;
  
  
  var left   = ((this.props.petalWidth-leftorigin)*(leftpixeldifference))-(leftintialstate) + 'px'; // To find left absolute position of div 
  var bottom = ((this.props.petalLength-bottomorigin)*(bottompixeldifference))+(bottomintialstate) + 'px'; // to find bottom absolute position of div
  
  var check  = this.props.species; // To check the species type and place revelant color
  if(check=='setosa'){
     var color = 'orange';
  }else if(check=='versicolor'){
     var color = 'green';
  }else if(check=='virginica'){
    var color = 'blue';
  }
    return <div  style={{background:color,width:'10px',height:'10px',position:'absolute',cursor:'pointer',borderRadius:'5px',left: left,bottom: bottom }} onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver(this.props.iter,this.props.species,this.props.petalWidth,this.props.petalLength,this.props.sepalWidth,this.props.sepalLength)}> </div>;
  }
}

//To place the mouseover data on the top left of the container.
class Righttopdata extends React.Component {
   render() {
      return (
         <div style={{width:'200px',height:'310px',position:'absolute',cursor:'pointer',borderRadius:'5px',left:'10px',top:'11px',display:'none'}} id="ele"> <span style={{display:'block'}}> <span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>i:</span><strong id="xnumber"></strong></span> <span style={{display:'block'}}><span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>species:</span> <strong id="xspecies"></strong></span> <span style={{display:'block'}}><span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>petalWidth:</span> <strong id="xpetalWidth"></strong></span><span style={{display:'block'}}><span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>petalLength:</span> <strong id="xpetalLength"></strong></span><span style={{display:'block'}}><span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>sepalWidth:</span> <strong id="xsepalWidth"></strong></span><span style={{display:'block'}}><span style={{textAlign:'left',minWidth:'100px',display:'inline-block'}}>sepalLength:</span> <strong id="xsepalLength"></strong></span>
         </div>
      );
   }
}
