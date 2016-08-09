var albums_template, the_album_template, details_template;

var current_album = animals_data.category[0];
var current_photo = current_album.animals[0];
var detail_index = 0;

function showTemplate(template, data){
	var html = template(data);
	$('#content').html(html);
}

function manageDetails() {
	$("#left-click").click(function() {
		l = current_album.animals.length;
		detail_index = detail_index - 1;
		if (detail_index < 0) {
			detail_index += l;
		}
		current_photo = current_album.animals[detail_index];
		showTemplate(details_template, current_photo);
		manageDetails();
	});
		
	$("#right-click").click(function() {
		l = current_album.animals.length;
		detail_index = detail_index + 1;
		if (detail_index > l - 1) {
			detail_index = 0;
		}
		current_photo = current_album.animals[detail_index];
		showTemplate(details_template, current_photo);
		manageDetails();
	});
}

$(document).ready(function(){
	
	var source   = $("#albums-template").html();
	albums_template = Handlebars.compile(source);
	
	source   = $("#the_album_template").html();
	the_album_template = Handlebars.compile(source);
	
	source   = $("#details_template").html();
	details_template = Handlebars.compile(source);
	
	$("#albums-tab").click(function () {
		current_album = animals_data.category[0];
		current_photo = current_album.animals[0];
		detail_index = 0;
		
		showTemplate(albums_template, animals_data);
		$(".nav-tabs .active").removeClass("active");
		$("#albums-tab").addClass("active");
		
		$(".album-clicking").click(function (){
			var index = $(this).data("id");
			current_album = animals_data.category[index];
			current_photo = current_album.animals[0];
			
			showTemplate(the_album_template, current_album);
			
			$(".the-album-click").click(function (){
				var index = $(this).data("id");
				detail_index = index;
				current_photo = current_album.animals[index];
			
				showTemplate(details_template, current_photo);
				manageDetails();
			});
		});
	});
	
	$("#the-album-tab").click(function () {
		
		showTemplate(the_album_template, current_album);
		$(".nav-tabs .active").removeClass("active");
		$("#the-album-tab").addClass("active");
		
		$(".the-album-click").click(function (){
			var index = $(this).data("id");
			current_photo = current_album.animals[index];
			detail_index = index;
			
			showTemplate(details_template, current_photo);
			manageDetails();
		});
	});
	
	$("#details-tab").click(function () {
		$(".nav-tabs .active").removeClass("active");
		$("#details-tab").addClass("active");
			
		showTemplate(details_template, current_photo);
		manageDetails();
		
	});
	
	$("#albums-tab").click();
});