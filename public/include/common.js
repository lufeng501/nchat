/**
 * Created by 37 on 2017/2/27.
 */

// 获取csrf-token
function header() {
    var header = {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
    return header;
}

// post
function ajax_post(data, url, successfn, dataType) {
  $.ajax({
    type: "POST",
    url: url,       //提交的URL
    data: data,
    dataType: dataType,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success: function (json) {
      successfn(json);
    },
    error: function (request) {
      $.error("Connection error");
    }
  });
}

// get
function ajax_get(data, url, successfn, dataType) {
  $.ajax({
    type: "GET",
    url: url,   //提交的URL
    data: data,
    dataType: dataType,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success: function (json) {
      successfn(json);
    },
    error: function (request) {
      $.error("Connection error");
    }
  });
}

/**
 * 判断变量是否为空
 * @param {Number}{String} data
 */
function isNull(data) {
  if (data == "" || data == undefined || data == null || data == "false") {
    return true;
  } else {
    return false;
  }
}

/**
 * 对象的结构转化成key-value结构
 * @param   object
 * @param   k
 * @return  object
 */
function convertObjToKeyValue(object, key) {
    var kvObject = {};
    if (!isNull(object) && !$.isEmptyObject(object)) {
        $.each(object, function (index, item) {
            if (!isNull(item[key])) {
                kvObject[item[key]] = item;
            }
        })
    }
    return kvObject;
}

/***
 * 自动获取高度
 */
function getLayoutAutoHeight() {
    setLayoutAutoHeight();
    $(window).resize(function () {
        setLayoutAutoHeight();
    });
}

function setLayoutAutoHeight() {
    //头高度
    header_height = $('.header').height();
    //左边菜单宽度和高度
    left_menu_width = $('#left-menu').width();
    left_menu_height = $('#left-menu').height();
    //window高度
    window_height = $(window).height();
    //window宽度
    window_width = $(window).width();
    //取得内容高度
    container_height = parseInt(window_height) - parseInt(header_height);
    //设置
    $('#container').height(container_height);

    //设置右边内容高度和宽度
    main = $('#main');
    main.height(container_height);
    main.width(parseInt(window_width) - parseInt(left_menu_width) - 10);

    //设置left-menu的margin-top高度
    left_menu_margin_top = parseInt((container_height - left_menu_height) / 2);
    //$('#left-menu ul').css({'margin-top': left_menu_margin_top + 'px'});

}


/**
 * 拼接url参数
 * @param url
 * @param params
 * @returns {*|XML|string|void}
 */
function createURL(url, params) {
  var link = url
  $.each(params, function (key, item) {
    link = link + '&' + key + "=" + item;
  })
  return link.replace(' ', '');
}
