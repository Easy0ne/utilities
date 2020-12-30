	/**
     * 文本框根据输入内容自适应高度
     * @param                {HTMLElement}        输入框元素
     * @param                {Number}                设置光标与输入框保持的距离(默认0)
     * @param                {Number}                设置最大高度(可选)
     */
	 
	var xmlhttp;
	 
	function loadData(url, cfunc) {
	  if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	  } else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange = cfunc;
	  xmlhttp.open("GET", url, true);
	  xmlhttp.send();
	};
	 
	function readFile(url) {
	  loadData(url, function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		  console.log('读取的数据 ==== ', xmlhttp.responseText);
		  return xmlhttp.responseText;
		} else {
		  return '';
		}
	  })
	};

	function loadmdfile() {
		var filein = document.getElementById('file1')
		var file = filein.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
            var data = e.target.result;
            console.log(data)
        };

		content = reader.readAsDataURL(file);
		console.log(content)
		document.getElementById('postEditContent').value = content;
    }