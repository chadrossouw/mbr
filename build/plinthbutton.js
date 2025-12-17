tinymce.create("tinymce.plugins.soulButton", {
	init: function (t, n) {
		t.addButton("soulBtn", {
			title: "Fancy soul Button",
			cmd: "soulBtnCmd",
			image: n + "/button.png",
		}),
			t.addCommand("soulBtnCmd", function () {
				var n = t.selection.getContent({ format: "html" }),
					e = t.windowManager.open({
						title: "Button Properties",
						body: [
							{
								type: "textbox",
								name: "buttontext",
								label: "Button Text",
								minWidth: 500,
								value: n,
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
									e.submit();
								},
							},
							{
								text: "Cancel",
								onclick: function () {
									e.close();
								},
							},
						],
						onsubmit: function (n) {
							let e = "",
								o = "",
								a = "";
							console.log(n.data),
								n.data.newwindow && (e = 'target="_blank"'),
								n.data.addmailto && (o = "mailto:"),
								(a = n.data.buttonurl);
							var u =
								'<a href="' +
								o +
								a +
								'"' +
								e +
								'class="link_button layout_button dark_blue">' +
								n.data.buttontext +
								"</a>";
							t.execCommand("mceInsertContent", 0, u);
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
}),
	tinymce.PluginManager.add("wmgbutton", tinymce.plugins.soulButton);
//# sourceMappingURL=plinthbutton.js.map
