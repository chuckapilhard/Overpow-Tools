// Hides main areas (from navbar) and sets toggles
jQuery('#tools').hide();
jQuery('#howto').hide();
jQuery('#support').hide();
jQuery('#customModules').hide();
jQuery(document).ready(function(){
        jQuery('#homeShow').on('click', function(event) {        
             jQuery('#tools').hide();
             jQuery('#howto').hide();
             jQuery('#support').hide();
             jQuery('#home').show();
             jQuery('#customModules').hide();
        });
    });
jQuery(document).ready(function(){
        jQuery('#toolsShow').on('click', function(event) {        
             jQuery('#home').hide();
             jQuery('#howto').hide();
             jQuery('#support').hide();
             jQuery('#tools').show();
             jQuery('#customModules').hide();
        });
    });
jQuery(document).ready(function(){
        jQuery('#howtoShow').on('click', function(event) {        
             jQuery('#home').hide();
             jQuery('#support').hide();
             jQuery('#tools').hide();
             jQuery('#howto').show();
             jQuery('#customModules').hide();
        });
    });
jQuery(document).ready(function(){
        jQuery('#supportShow').on('click', function(event) {        
             jQuery('#home').hide();
             jQuery('#howto').hide();
             jQuery('#tools').hide();
             jQuery('#support').show();
             jQuery('#customModules').hide();
        });
    });
    jQuery(document).ready(function(){
        jQuery('#customModulesShow').on('click', function(event) {        
             jQuery('#home').hide();
             jQuery('#howto').hide();
             jQuery('#tools').hide();
             jQuery('#support').hide();
             jQuery('#customModules').show();
        });
    });

//hide tags


// Hides sub-area 'Tools' and sets toggles
jQuery('#spawns').hide();
jQuery('#instances').hide();
jQuery('#properties').hide();
jQuery('#static').hide();
jQuery('#glass').hide();
jQuery('#button').hide();
jQuery('#door').hide();
jQuery('#models').hide();
jQuery('#stairs').hide();
jQuery('#static-models').hide();
jQuery(document).ready(function(){
        jQuery('#spawnsShow').on('click', function(event) {
            jQuery('#models').hide();
            jQuery('#static-models').hide();    
            jQuery('#instances').hide();
            jQuery('#static').hide();
            jQuery('#glass').hide();
            jQuery('#button').hide();
            jQuery('#door').hide();
            jQuery('#properties').hide();
            jQuery('#spawns').toggle();
            
        });
    });
jQuery(document).ready(function(){
        jQuery('#instancesShow').on('click', function(event) {
            jQuery('#models').hide(); 
            jQuery('#static-models').hide();   
            jQuery('#spawns').hide();
            jQuery('#static').hide();
            jQuery('#glass').hide();
            jQuery('#button').hide();
            jQuery('#door').hide();
            jQuery('#properties').hide();
            jQuery('#instances').toggle();
        });
    });
jQuery(document).ready(function(){
        jQuery('#staticShow').on('click', function(event) {        
            jQuery('#spawns').hide();
            jQuery('#static-models').hide();
            jQuery('#instances').hide();
            jQuery('#glass').hide();
            jQuery('#button').hide();
            jQuery('#door').hide();
            jQuery('#properties').hide();
            jQuery('#static').toggle();
            jQuery('#models').show();
            
        });
    });
jQuery(document).ready(function(){
        jQuery('#glassShow').on('click', function(event) {        
            jQuery('#spawns').hide();
            jQuery('#static-models').hide();
            jQuery('#instances').hide();
            jQuery('#static').hide();
            jQuery('#button').hide();
            jQuery('#door').hide();
            jQuery('#properties').hide();
            jQuery('#glass').toggle();
            jQuery('#models').show();
            
        });
    });
jQuery(document).ready(function(){
        jQuery('#buttonShow').on('click', function(event) {        
            jQuery('#spawns').hide();
            jQuery('#static-models').hide();
            jQuery('#instances').hide();
            jQuery('#glass').hide();
            jQuery('#static').hide();
            jQuery('#door').hide();
            jQuery('#properties').show();
            jQuery('#button').toggle();
            jQuery('#models').show();
            
        });
    });
jQuery(document).ready(function(){
        jQuery('#doorShow').on('click', function(event) {        
            jQuery('#spawns').hide();
            jQuery('#static-models').hide();
            jQuery('#instances').hide();
            jQuery('#glass').hide();
            jQuery('#button').hide();
            jQuery('#static').hide();
            jQuery('#properties').show();
            jQuery('#door').toggle();
            jQuery('#models').show();
            
        });
    });
    jQuery(document).ready(function(){
        jQuery('#static-modelsShow').on('click', function(event) {        
            jQuery('#spawns').hide();
            jQuery('#static-models').toggle();
            jQuery('#instances').hide();
            jQuery('#glass').hide();
            jQuery('#button').hide();
            jQuery('#static').hide();
            jQuery('#properties').hide();
            jQuery('#door').hide();
            jQuery('#models').hide();
            
        });
    });
jQuery(document).ready(function(){
        jQuery('#stairsShow').on('click', function(event) {        
            jQuery('#stairs').toggle();
        });
    });


// End of toggles

if ($('#spawns').is(":visible")) {
jQuery('#spawnsTag').show();
}

// Enables bootstrap tooltips for the whole page
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
//

// close, minimize buttons
(function () {
      
	const remote = require('electron').remote; 
	
	function init() { 
	  document.getElementById("min-btn").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		window.minimize(); 
	  });
	  
	  document.getElementById("max-btn").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		if (!window.isMaximized()) {
		  window.maximize();
		} else {
		  window.unmaximize();
		}	 
	  });
	  
	  document.getElementById("close-btn").addEventListener("click", function (e) {
		const window = remote.getCurrentWindow();
		window.close();
	  }); 
	}; 
	
	document.onreadystatechange = function () {
	  if (document.readyState == "complete") {
		init(); 
	  }
	};
})();
//

const electron = require('electron');
    let {ipcRenderer} = electron;
    let btn = document.getElementById('resizeWin');
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        ipcRenderer.send('resize', 1200, 1000);
    });