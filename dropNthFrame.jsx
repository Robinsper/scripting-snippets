﻿//Script drops every Nth frame starting from a given framevar activeItem = app.project.activeItem;if(activeItem != null && activeItem instanceof CompItem){        var frameStart = 0; //when to start    var delta = 5; //Drop this frame    var fd = activeItem.frameDuration;    var sel = activeItem.selectedLayers;    if(sel != null){        if(sel[0].timeRemapEnabled == false){             sel[0].timeRemapEnabled = true;        }        delta--;        var curFrame = frameStart*fd;        var tr = sel[0].property("ADBE Time Remapping");        var shift = 0;        app.beginUndoGroup("Dropping every " + String(delta+1) + " frame");        while((curFrame+fd*(delta))<sel[0].source.duration){            tr.setValueAtKey(tr.addKey(curFrame-shift*fd), curFrame); //add first            tr.setValueAtKey(tr.addKey(curFrame+fd*(delta-shift)), curFrame+delta*fd); //add second +shift            curFrame += (delta*fd + 2*fd); //increment frame            shift++;        }        app.endUndoGroup();    }}   