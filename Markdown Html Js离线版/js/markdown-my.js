/**
     * 文本框根据输入内容自适应高度
     * @param                {HTMLElement}        输入框元素
     * @param                {Number}                设置光标与输入框保持的距离(默认0)
     * @param                {Number}                设置最大高度(可选)
     */
    var autoTextarea = function (elem, extra, maxHeight) {
      extra = extra || 0;
      var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
          elem.addEventListener ?
            elem.addEventListener(type, callback, false) :
            elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
          var val = elem.currentStyle[name];

          if (name === 'height' && val.search(/px/i) !== 1) {
            var rect = elem.getBoundingClientRect();
            return rect.bottom - rect.top -
              parseFloat(getStyle('paddingTop')) -
              parseFloat(getStyle('paddingBottom')) + 'px';
          };

          return val;
        } : function (name) {
          return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));


      elem.style.resize = 'none';

      var change = function () {
        var scrollTop, height,
          padding = 0,
          style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
          padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
          if (maxHeight && elem.scrollHeight > maxHeight) {
            height = maxHeight - padding;
            style.overflowY = 'auto';
          } else {
            height = elem.scrollHeight - padding;
            style.overflowY = 'hidden';
          };
          style.height = height + extra + 'px';
          scrollTop += parseInt(style.height) - elem.currHeight;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          elem.currHeight = parseInt(style.height);
        };
      };

      addEvent('propertychange', change);
      addEvent('input', change);
      addEvent('focus', change);
      change();
    };


    function bindOnchange(object, fn) {
      var testinput = document.createElement('input');
      if ('oninput' in testinput) {
        object.addEventListener("input", fn, false);
      } else {
        object.onpropertychange = fn;
      }

      var ie = !!window.ActiveXObject;
      if (ie) {
        object.onpropertychange = fn;
      } else {
        object.addEventListener("input", fn, false);
      }
    }

    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function myMarkDown(text) {
      text = text.replaceAll('<table>', '<table class="pure-table pure-table-bordered">');
      text=text.replaceAll("<hr>\n<hr>",'<div style="page-break-after: always;"></div>');
      return text;
    }
    var chart;

    function flowDraw(cd, code) {
      if (chart) {
        chart.clean();
      }
      chart = flowchart.parse(code);
      chart.drawSVG(cd, {
        // 'x': 30,
        // 'y': 50,
        'line-width': 3,
        'maxWidth': 5, //ensures the flowcharts fits within a certian width
        'line-length': 50,
        'text-margin': 10,
        'font-size': 14,
        'font': 'normal',
        'font-family': 'Helvetica',
        'font-weight': 'normal',
        'font-color': 'black',
        'line-color': 'black',
        'element-color': 'black',
        'fill': 'white',
        'yes-text': 'yes',
        'no-text': 'no',
        'arrow-end': 'block',
        'scale': 1,
        'symbols': {
          'start': {
            'font-color': 'black',
            'element-color': '',
            'fill': ''
          },
          'end': {
            'class': 'end-element'
          }
        },
        'flowstate': {
          'past': {
            'fill': 'lightgrey',
            'font-size': 12
          },
          'current': {
            'fill': 'lightgrey',
            'font-color': 'red',
            'font-weight': 'bold'
          },
          'future': {},
          'request': {
            'fill': 'blue'
          },
          'invalid': {
            'fill': 'lightgrey'
          },
          'approved': {
            'fill': 'lightgrey',
            'font-size': 12,
            'yes-text': 'APPROVED',
            'no-text': 'n/a'
          },
          'rejected': {
            'fill': 'lightgrey',
            'font-size': 12,
            'yes-text': 'n/a',
            'no-text': 'REJECTED'
          }
        }
      });
    }

    var md = window.markdownit({
      breaks: true,
      typographer: true,
      linkify: true,
      highlight: function (str, lang) {
        if (lang == 'flow') {
          return '<div class="myflowchart" style="text-align:center;">' + str + '</div>';
        }
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs" style=" padding-top: 1em;border-radius: 0.5em;border: 1px solid lightgray;"><div style="position:relative;top:-1em; left:0px;float:right; z-index:99;"><code>' + lang +
            '</div>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    }).use(window.markdownitEmoji).use(window.markdown_it_katex);
    md.use(window.markdown_it_task, {
      label: true,
      divClass: 'pure-checkbox'
    });


    md.renderer.rules.emoji = function (token, idx) {
      return window.twemoji.parse(token[idx].content);
    };

    function HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    }

    function markdownShow() {
      var result = md.render(document.getElementById('postEditContent').value);
      document.getElementById('markdownShow').innerHTML = myMarkDown(result);
      var charts = document.getElementsByClassName("myflowchart");
      for (var i = 0; i < charts.length; i++) {
        var canvas = charts[i];
        var str = canvas.innerHTML;
        //console.log("str:" + HTMLDecode(str));
        if (!canvas.id) {
          canvas.setAttribute('id', "myflowchart" + i);
        }
        canvas.innerHTML = '';
        flowDraw(canvas.id, HTMLDecode(str));
      }
      document.getElementById('htmlContent').value=document.getElementById('markdownShow').innerHTML;
    }
    // start run 
    bindOnchange(document.getElementById('postEditContent'), markdownShow);
    markdownShow();








    //////////////////
    var value = localStorage.getItem('draft');
    if (!value) {
      //localStorage.setItem('draft', document.getElementById('postEditContent').value);
    } else {
      document.getElementById('postEditContent').value = value;
      markdownShow();
    }

    function sendOnchage(element) {
      if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
      } else
        element.fireEvent("onchange");
    }

    function savedraft() {
      localStorage.setItem('draft', document.getElementById('postEditContent').value);
      sendOnchage(document.getElementById('postEditContent'));
      markdownShow();
    }

    function newstart() {
      localStorage.setItem('draft', '# 新的开始');
      location.reload();
    }

    function savereset() {
      localStorage.removeItem('draft');
      location.reload();
    }


    function hide(id) {
      document.getElementById(id).style.display = "none";
    }

    function show(id) {
      document.getElementById(id).style.display = "block";
    }



    var preview_status = false;

    function preview() {
      if (!preview_status) {
        hide('part-left');
        Id('part-right').className = "pure-u-1-1";
        //Id('body').style.fontSize="1.5em";
      } else {
        show('part-left');
        Id('part-right').className = "pure-u-1-2";
        //Id('body').style.fontSize="1em";
      }
      preview_status = !preview_status;
    }

    function savepdfing(dis = true) {
      var btn = document.getElementById('savepdf');
      if (dis) {
        btn.innerHTML = '正在导出';
        btn.disabled = true;
        Id('loading').style.display='inline';
        Id('loadingDone').style.display='none';
      } else {
        Id('loading').style.display='none';
        Id('loadingDone').style.display='inline';
        btn.innerHTML = '导出PDF';
        btn.disabled = false;
      }
    }

    function unixtime() {
      return Math.round(new Date().getTime()/1000);
    }

    function savepdf() {
      console.log("start:"+unixtime());
      var api = 'https://www.hashspace.cn/mu/api/1.0/Markdown/savepdf';
      var d = [];
      d.push('htmlContent=' + encodeURIComponent(document.getElementById('markdownShow').innerHTML));
      savepdfing(true);
      httpPost(api, d.join("&"), function (res) {
        var resp = JSON.parse(res);
        if (resp.error != 0) {
          alert(resp.message);
        } else {
          startquery(resp.data.fileId);
        }
      });
    }

    function download(url,filename) {
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    }

    var pdfname;
    function startquery(fileId) {
      const timeId = setInterval(
        () => {
          querypdf(fileId, function (res) {
            var resp = JSON.parse(res);
            console.log(resp);
            if (resp.data.done == 1) {
              console.log("end:"+unixtime());
              clearInterval(timeId);
              savepdfing(false);
              if(!pdfname) {
                pdfname = prompt("PDF已经准备好了，请输入想保存的文件名 (无需输入.pdf)");
              }      
              download('/markdown/page.php?do=download&fileId=' + fileId + '&fileName=' + pdfname + '.pdf',pdfname + '.pdf');
            }
          });
        }, 2000
      );
    }

    function querypdf(fileId, fn) {
      var api = '/mu/api/1.0/Markdown/querypdf?fileId=' + fileId;
      httpGet(api, fn);
    }
    autoTextarea(Id('postEditContent'));