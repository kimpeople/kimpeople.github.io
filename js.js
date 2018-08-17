
var elem = document.getElementById('randomimg');
var size = Math.floor(Math.random()*(randomimg.length));
size = (isNaN(size)) ? 0 : size;
elem.setAttribute('src', randomimg[size]);
        var slideIndex = 1;
        showDivs(slideIndex);

        function plusDivs(n) {
        showDivs(slideIndex += n);
        }
        function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length} ;
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";
        }
        x[slideIndex-1].style.display = "block";
            var counter = document.getElementsByClassName("counter")[0];
            counter.innerHTML = "<span>" + slideIndex + "/" + x.length + "</span>";
        }
