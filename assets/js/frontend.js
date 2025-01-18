jQuery(document).ready(function($) {
    $('.samimage img').click(function(event) {
        
        var id = $(this).data('id');
        
        var src = $(this).attr('src');
        
        var img = $('#featured img');

        img.fadeOut('fast', function() {
            $(this).attr({src: src,});
            $(this).fadeIn('fast');
        });
    });
});

var modal = document.getElementById('myModal');

var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
img.onclick = function(){
modal.style.display = "block";
modalImg.src = this.src;
modalImg.alt = this.alt;

}

modal.onclick = function() {
img01.className += " out";
setTimeout(function() {
modal.style.display = "none";
img01.className = "modal-content";
}, 400);

}    