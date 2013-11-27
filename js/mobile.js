//ajax call
var info = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "https://dl.dropboxusercontent.com/u/14252512/restaurants.min.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 
info = info.places;

//pageinit event for first page
//triggers only once
//write all your on-load functions and event handlers pertaining to page1
$(document).on("pageinit", "#info-page", function () {


    //set up string for adding <li/>
    var li = "";
    //container for $li to be added
    $.each(info, function (i, name) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#" id="' + i + '" class="info-go">'+ '<img src="img/spoon-fork.png" alt="chef" class="ui-li-icon">' + name.name + '</a></li>';
    });
    //append list to ul
    $("#prof-list").append(li).promise().done(function () {
        //wait for append to finish - thats why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #details-page
        $(this).on("click", ".info-go", function (e) {
            e.preventDefault();
            //store the information in the next page's data
            $("#details-page").data("info", info[this.id]);
            //change the page # to second page. 
            //Now the URL in the address bar will read index.html#details-page
            //where #details-page is the "id" of the second page
            //we're gonna redirect to that now using changePage() method
            $.mobile.changePage("#details-page", {transition:"slide"} );
        });

        //refresh list to enhance its styling.
        $(this).listview("refresh");
    });
});

//use pagebeforeshow
//DONT USE PAGEINIT! 
//the reason is you want this to happen every single time
//pageinit will happen only once
$(document).on("pagebeforeshow", "#details-page", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");
    //string to put HTML in
    info_view = '<h1>'+info['name']+'</h1>'
    info_view += '<p>A party of '+info['party']+' takes about '+info['minutes']+' minutes.</p>'
    info_view += '<img src="http://maps.googleapis.com/maps/api/staticmap?center='+info['address']+'&zoom=14&markers=color:red%7C'+info['address']+'&size=300x200&sensor=false">'
    info_view += '<p>Address: '+info['address']+'</p>'
    //add this to html
    $(this).find("[data-role=content]").html(info_view);
    //$('#yelp').attr("href", "http://www.yelp.com/biz/"+info['yelp'])
    //$('#location').attr("href", "http://maps.google.com/maps?daddr='"+info['address']+"'")
});