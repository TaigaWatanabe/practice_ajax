$(document).ready(function(){
	$('#submit').on('click', function(){
		var content = $(".content").val();

		$.ajax({
			url: "/add",  // リクエストを送信するURLを指定（action属性のurlを抽出）
			type: "POST",  // HTTPメソッドを指定（デフォルトはGET）
			data: {
				"content" : content
			},
			dataType: "json"
		})
		.done(function(data) {
			var data_stringify = JSON.stringify(data);
			var data_json = JSON.parse(data_stringify);

			var data_id = data_json["id"];
			var content = data_json["content"];

			// 追加
			$("#addContent").after(`
			<div class="addContent${data_id}">
				<h4>${content}</h4>

				<!-- 編集ボタン -->
				<div  style="display:inline;" class="edit${data_id}">
					<a action="/Edit/${data_id}" method="get">
						<button type="button" onclick="getEditFunk('${data_id}')">編集</button>
					</a>
				</div>

				<!-- 次回 -->

				<!-- 削除ボタン -->
				<form action="/Delete/${data_id}" method="delete" style="display:inline;">
					<button type="button" class="btn btn-outline-danger" onclick="deleteContent('${data_id}')">Delete</button>
				</form>

				<!-- 次回 -->
			</div>`);

			$(".content").val("");
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");  //
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
	})
})

// 追加

// 編集機能 情報取得
function getEditFunk(id) {

	var edit_url = "/Edit/" + id;

	$.ajax({
		url: edit_url,
		type: "GET",
		data: {
			"id": id
		},
		dataType: "json"
	})
	.done(function(data) {

		var data_id = data["id"];
		var content = data["content"];
		// 追加、削除先を指定
		var edit_btn = ".edit" + data_id;

		// 更新ボタンを追加
		$(edit_btn).before(`
		<div style="display:inline;" class="update${data_id}">
			<a action="/Update/${data_id}" method="put">
				<button type="button" onclick="UpdateFunk('${data_id}')">更新</button>
			</a>
		</div>`);

		// 編集ボタンを削除
		$(edit_btn).remove();

		var content_edit = "#content" + data_id;
		// 編集欄を表示
		$(content_edit).after(`
		    <div id="content${data_id}" style="margin: 1rem 0;">
				<input type="text" name="content" size="20" maxlength="200" id="update_content${data_id}"
		    	value="${content}"/>
		    </div>`);
		// 元投稿を削除
		$(content_edit).remove();

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
// 編集機能 情報取得

//編集機能 更新機能
function UpdateFunk(id) {

	var updata_url = "/Updata/" + id;
	var update_value = "#update_content" + id;
	var update_content = $(update_value).val();

	$.ajax({
		url: updata_url,
		type: "PUT",
		data: {
			"id": id,
			"content": update_content
		},
		dataType: "json"
	})
	.done(function(data) {
		var data_stringify = JSON.stringify(data);
		var data_json = JSON.parse(data_stringify);

		var data_id = data_json["id"];
		var content = data_json["content"];

		// 追加、削除先を指定
		var update_btn = ".update" + data_id;

		// 編集ボタンを追加
		$(update_btn).before(`
		<div style="display:inline;" class="edit${data_id}">
			<a action="/Edit/${data_id}" method="get">
				<button type="button" onclick="getEditFunk('${data_id}')">編集</button>
			</a>
		</div>`);

		// 更新ボタンを削除
		$(update_btn).remove();

		var content_update = "#content" + data_id;
		// 投稿を表示
		$(content_update).after(`
		    <div id="content${data_id}" style="margin: 1rem 0;">
				<h4>${content}</h4>
		    </div>`);

		// 元投稿を削除
		$(content_update).remove();

	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert("error!");
		console.log("jqXHR          : " + jqXHR.status);
		console.log("textStatus     : " + textStatus);
		console.log("errorThrown    : " + errorThrown.message);
	})

};
//編集機能 更新機能

//追加
// 削除機能
function deleteContent(id) {

	var delete_url = "/Delete/" + id;

	if(window.confirm('本当に削除しますか?')){
		$.ajax({
			url: delete_url,
			type: "delete",
			data: {
				id: id,
			}
		})
		.done(function() {
			var deleteContent = ".addContent" + id;

			$(deleteContent).remove();  // 投稿削除
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("error!");
			console.log("jqXHR          : " + jqXHR.status);
			console.log("textStatus     : " + textStatus);
			console.log("errorThrown    : " + errorThrown.message);
		})
		return true;
	}
	else{
		window.confirm('キャンセルしました');
		return false; // suspend sending
	}

};
//削除機能