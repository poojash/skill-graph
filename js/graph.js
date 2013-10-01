( function( $,undefined ) {
  
    $.widget( "ps.graph", {
       version: "0.0.1",
       
        options: {
			size:200,
			bars:[
					{title:'PHP',value:'50'},
					{title:'JQUERY',value:'80'},
					{title:'HTML',value:'90'},
					{title:'CSS',value:'90'}
				],
			ticks:[0,25,50,75,100]	
			},
			
        _create: function() {
  			this.element.addClass("container");
			//Need to fix the width-user input and height- by running a calculation function 
			 this._container = $('<div/>',{class:'chart-container'}).appendTo(this.element);
			this._setOptions({
				
				'bars':this.options.bars,
				'ticks':this.options.ticks,
				'size':this.options.size
				});	
			
        },
    
        _setOption: function( key, value ) {
			console.log("option")
			var widget = this;
			fnmap = {
				'ticks':function(){
						widget.createTicks(value,widget);
					},
				'bars':function(){
						widget.createBars(value,widget);
					},
				 'size':function(){
					 	widget.element.find('.chart-container').css('width',value);					 
					 }	
				};
 
             this._super( key, value );
			 if(key in fnmap){
				 console.log("in if of fnmap");
				 	fnmap[key]();
				 } 
        },
		
		createTicks:function(ticks,widget){
			//clearing any existing
			console.log("creat tickests" );
			widget.element.find('.ticks').remove();
			var tickContainer = $('<div/>',{
					class:'ticks',
				}).appendTo(this._container);
				$.each(ticks,function(i,tick){
					var t=$('<div/>',{class:'tick'}).css('left',tick+'%').appendTo(tickContainer);
					var tl=$('<div/>',{
						class:'ticklabel',
						text:tick
						}).css('left',tick+'%').appendTo(tickContainer);
					});
			},//end of createTics function
			
			createBars:function(bars,widget){
				console.log("bar");
				widget.element.find('.graph').remove();
					var graph = $('<div/>',{
						class:'graph',
					}).appendTo( this._container);
					$.each(bars,function(i,bar){
					var bar= $('<div/>',{
								class:'bar',
								text:bar['title']+" ("+bar['value']+'%)'
								}).css('width','0%').animate({'width':bar['value']+'%'});
								bar.appendTo(graph);
						});
				},
		
        _destroy: function() {
           this.element.removeClass('container');
  		   this.element.empty();
        },
    });
})( jQuery );