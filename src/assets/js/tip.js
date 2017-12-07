(function($) {

    window.Ewin = function() {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function() {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function(options) {
            options = $.extend({}, {
                title: "操作提示",
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function(node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function(e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            alert: function(options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function(callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function() { callback(true); });
                        }
                    },
                    hide: function(callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function(e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function(options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function(callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function() { callback(true); });
                            modal.find('.cancel').click(function() { callback(false); });
                        }
                    },
                    hide: function(callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function(e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            dialog: function(options) {
                options = $.extend({}, {
                    title: 'title',
                    url: '',
                    width: 800,
                    height: 550,
                    onReady: function() {},
                    onShown: function(e) {}
                }, options || {});
                var modalId = generateId();

                var content = dialogdHtml.replace(reg, function(node, key) {
                    return {
                        Id: modalId,
                        Title: options.title
                    }[key];
                });
                $('body').append(content);
                var target = $('#' + modalId);
                target.find('.modal-body').load(options.url);
                if (options.onReady())
                    options.onReady.call(target);
                target.modal();
                target.on('shown.bs.modal', function(e) {
                    if (options.onReady(e))
                        options.onReady.call(target, e);
                });
                target.on('hide.bs.modal', function(e) {
                    $('body').find(target).remove();
                });
            }
        }
    }();
})(jQuery);

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return format;
};

export const GetDateStr = (AddDayCount) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
};
export const addHoverDom = (treeId, treeNode) => {
    if (treeNode.level >= 3) return;
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
        "' title='增加' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function() {
        var zTree = $.fn.zTree.getZTreeObj("area_tree");
        var newNodes = zTree.addNodes(treeNode, {
            pId: treeNode.id,
            name: "",
            isNew: true,
        });
        if (newNodes.length > 0) {
            zTree.editName(newNodes[0]);
        }
        return false;
    });

};
export const removeHoverDom = (treeId, treeNode) => {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};
export const zTreeBeforeRemove = (treeId, treeNode) => {
    if (Ewin.confirm("确认删除？")) {
        return true;
    } else {
        return false;
    }
};
export const zTreeBeforeRename = (treeId, treeNode, newName, isCancel, addfun, updatefun) => {
    var _this = this;
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    const oldName = treeNode.name;
    /*新增节点直接取消或编辑后取消*/
    if (isCancel && treeNode.isNew) {
        setTimeout(function() {
            zTree.removeNode(treeNode);
        }, 10);
        return true;
    }
    /*已存在节点直接取消*或编辑后取消*/
    if (isCancel && !treeNode.isNew) {
        return true;
    }
    /*节点名为空*/
    if (!isCancel && newName.length == 0) {
        _this.$Message.error("区域名称不能为空！");
        return false;
    }
    /*新增节点回车弹框*/
    if (!isCancel && treeNode.isNew) {
        if (!confirm("确认添加？")) {
            setTimeout(function() {
                zTree.removeNode(treeNode);
            }, 10);
            return true;
        } else {
            // this.addAreaOne({ "name": newName, "pId": treeNode.pId });
            addfun
            return true;
        }
    }
    /*已存在节点回车弹框*/
    if (!isCancel && !treeNode.isNew) {
        if (oldName === newName) {
            return true;
        }
        updatefun
        // this.updateArea({ "name": newName, "pId": treeNode.pId, "id": treeNode.id });
        return true;
    }
};