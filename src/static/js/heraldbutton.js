(function () {
	tinymce.create("tinymce.plugins.soulButton", {
		init: function (ed, url) {
			ed.addButton("soulBtn", {
				title: "Fancy soul Button",
				cmd: "soulBtnCmd",
				image: url + "/button.png",
			});
			ed.addCommand("soulBtnCmd", function () {
				var selectedText = ed.selection.getContent({ format: "html" });
				var win = ed.windowManager.open({
					title: "Button Properties",
					body: [
						{
							type: "textbox",
							name: "buttontext",
							label: "Button Text",
							minWidth: 500,
							value: selectedText,
						},
						{
							type: "textbox",
							name: "buttonurl",
							label: "Button Url",
							minWidth: 500,
							value: "",
						},
						{
							type: "checkbox",
							name: "addmailto",
							label: "Email address",
							value: "",
						},
						{
							type: "checkbox",
							name: "newwindow",
							label: "Open in New Window",
							value: "",
						},
					],
					buttons: [
						{
							text: "Ok",
							subtype: "primary",
							onclick: function () {
								win.submit();
							},
						},
						{
							text: "Cancel",
							onclick: function () {
								win.close();
							},
						},
					],
					onsubmit: function (e) {
						let target = "";
						let mailto = "";
						let anchor = "";
						console.log(e.data);
						if (e.data.newwindow) {
							target = 'target="_blank"';
						}
						if (e.data.addmailto) {
							mailto = "mailto:";
						}
						anchor = e.data.buttonurl;
						var returnText =
							'<a href="' +
							mailto +
							anchor +
							'"' +
							target +
							'class="link_button layout_button dark_blue">' +
							e.data.buttontext +
							"</a>";
						ed.execCommand("mceInsertContent", 0, returnText);
					},
				});
			});
		},
		getInfo: function () {
			return {
				longname: "Add soul styled Button",
				author: "Chad Rossouw for HdK",
				authorurl: "https://wearehdk.com",
				version: "1.0",
			};
		},
	});

	tinymce.PluginManager.add("soulbutton", tinymce.plugins.soulButton);
})();
