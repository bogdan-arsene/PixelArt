
$(document).ready(function () { 

  // Start with 8 x 8 board by default
  for (var i = 1; i <= 8; i++) { 
    $('table').append("<tr></tr>"); // This loop creates rows
    for (var j = 1; j <= 8; j++) {
      $('tr:last').append("<td></td>"); // This loop adds cells for every row
      $('td').attr("class", 'cells') // For every 'td' I added the class 'cells'
      $('.cells').css('background-color', 'white') // default color of every cell will be white
    }
  }

  // Allowing the user to color a cell on click with the chosen color from the color picker
  $('.cells').click(function (event) { 
    var paint = $('#colorPicker').val();
    $(event.target).css('background-color', paint); 
  });

  // Makes the fill tool draggable
  $(".color").draggable({
    revert:true
  });

  // Upon droping the bucket on a particular cell, colors all cells with the same color as this cell in the chosen color
  $(".cells").droppable({
    drop: function(e, ui) {
      var paint = $('#colorPicker').val();
      var color = $(this).css('background-color')
      $("td").each(function() {
        var id = $( this ).css( "background-color" )
        if (id === color){
          $( this ).css( "background-color", paint)
        }
      });
    }
  });


  // This creates a new board based on the user input upon clicking 'Submit' and adds the same features as above
  $('#sizePicker').submit(function makeGrid(grid) {
    
  
    $('table tr').remove(); // Lets the grid be cleared when hitting the 'Submit' button again
    var row_input = $('#input_height').val(); 
    var col_input = $('#input_width').val(); 
    for (var i = 1; i <= row_input; i++) { 
      $('table').append("<tr></tr>"); 
      for (var j = 1; j <= col_input; j++) {
        $('tr:last').append("<td></td>"); 
        $('td').attr("class", 'cells') 
        $('.cells').css('background-color', 'white')
      }
    }
    grid.preventDefault(); // Prevents the grid to be deleted after it is created

    // Allowing the user to color a cell on click with the chosen color from the color picker
    $('.cells').click(function (event) { 
      var paint = $('#colorPicker').val();
      $(event.target).css('background-color', paint); 
    });
    
    // Makes the fill tool draggable
    $(".color").draggable({
      revert:true
    });
    
    // Upon droping the bucket on a particular cell, colors all cells with the same color as this cell in the chosen color
    $(".cells").droppable({
      drop: function(e, ui) {
        var paint = $('#colorPicker').val();
        var color = $(this).css('background-color')
        $("td").each(function() {
          var id =$( this ).css( "background-color" )
          if (id === color){
            $( this ).css( "background-color", paint)
          }
        });  
      }
    });

  }); 

  $('#download-btn').on('click', function() {
    html2canvas($('#pixel_canvas'), {
        onrendered: function(canvas) {                                      

            var saveAs = function(uri, filename) {
                var link = document.createElement('a');
                if (typeof link.download === 'string') {
                    document.body.appendChild(link); // Firefox requires the link to be in the body
                    link.download = filename;
                    link.href = uri;
                    link.click();
                    document.body.removeChild(link); // remove the link when done
                } else {
                    location.replace(uri);
                }
            };

            var img = canvas.toDataURL("image/png"),
                uri = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

            saveAs(uri, 'amazing-painting.png');
        }
    }); 
});
 



});




