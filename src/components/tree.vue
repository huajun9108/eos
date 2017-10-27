

<template>
	<!--（ztree－🌲）-->
	<div class="ztree_content_wrap">
		<div class="zTreeDemoBackground left">
			<ul class="ztree">
				<ztree-item v-for='(i,m) in treeDataSource' :key="m" :model.sync="m" :num.sync='i' root='0' :nodes.sync='treeDataSource.length' :callback='func' :expandfunc='expand' :cxtmenufunc='contextmenu' :trees.sync='treeDataSource'></ztree-item>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data () {
		return {
			setting:{},
			treeDataSource:[]
		}
	},
	props:{
		// 树数据
        list:{
       	  	type:Array,
       	  	twoWay:true
        },
        // 点击节点回调
		func:{
			type:Function,
			default:null
		},
		// 点击展开回调
		expand:{
            type:Function,
            default:null
		},
		// 右击事件
		contextmenu:{
            type:Function,
            default:function(){
            	console.log("defalt click contextmenu");
            }
		},
		// 是否展开
		isOpen:{
			type:Boolean,
			default:false
		}
	},
	methods:{
        initTreeData(){
            var tempList = JSON.parse(JSON.stringify(this.list));
            
            // 递归操作，增加删除一些属性。比如: 展开/收起
            var recurrenceFunc = (data) => {
                data.forEach((m)=>{
                    m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false;
                    m.children = m.children || [];
                    if(m.children.length>0){
                   	  m.isFolder =  m.hasOwnProperty("open") ? m.open : this.isOpen;
                   	  m.isExpand =  m.hasOwnProperty("open") ? m.open : this.isOpen;
                   	  m.loadNode = 0; 
                   	  recurrenceFunc(m.children);
                    }else{
                      delete m.children;
                    }
                    
                })
            };
           recurrenceFunc(tempList);
           this.treeDataSource = tempList;
        }
	},
	components:{
		// 组件
        ztreeItem:{
        	name: 'ztreeItem',
        	props: {
        		model:{
        			type:Object,
        			twoWay:true
        		},
        		num:{
                    type:Number,
                    twoWay:true
        		},
        		nodes:{
                    type:Number,
                    twoWay:true,
                    default:0
        		},
        		trees:{
		       	  	type:Array,
		       	  	twoWay:true,
		       	  	default:[]
		        },
        		root:{
                    type:String,
                    twoWay:true
        		},
        		callback:{
					type:Function
				},
				expandfunc:{
					type:Function
				},
				cxtmenufunc:{
					type:Function
				}
        	},
        	methods:{
                Func(m){
                	if(typeof this.callback == "function") {
	                    this.callback.call(null,m);
	                }
                    
                    // 查找点击的子节点
                    var recurFunc = (data) => {
                        data.forEach(function(i){
                            if(i.id==m.id){
                              i.clickNode = true;
                            }else {
                              i.clickNode = false;
                            }
                            if(i.children){
                            	recurFunc(i.children);
                            }
                        })
                    }
                    recurFunc(this.trees);
                },
                open(m){
                    //
                	m.isExpand = !m.isExpand;
           
                	if(typeof this.expandfunc == "function" && m.isExpand) {
                       
                		if(m.loadNode!=2) {
		                	//
		                    this.expandfunc.call(null,m);
		                }else {
		                	m.isFolder = !m.isFolder;
		                }
	                } else {
                        m.isFolder = !m.isFolder;
	                }
                }
        	},
        	computed:{
        		// 给（根 和 子树）赋值不同的样式
                rootClass(){
                	 var strRootClass = '';
                     
                     // 根判断
                	 if(this.root=='0'){
                       strRootClass =  (this.num==0 && !this.model.children) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ? 
                         "root_" : (this.nodes == this.num+1) ? "bottom_" : "center_";
                     
                     // 子树判断
                	 }else if(this.root=='1') {
                        strRootClass =  this.nodes>1 && this.model.children && this.nodes!=this.num+1
                         ? "center_" : 
                            (this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" : 
                                 this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.children)   ? "bottom_" : "bottom_docu";
                	 }
                	 return  strRootClass
                },
                // 是否有儿子节点
                isChildren(){
                     return this.num+1 != this.nodes;
                },
                // 展开/收起
                prefixClass(){
                	var returnChar = "";
                	if(this.rootClass.indexOf("docu")==-1){
	                	if(this.model.isFolder){
                           returnChar = "open";
	                	}else {
                           returnChar = 'close'
	                	}
	                }
	                if(!this.model.children && this.rootClass.indexOf("docu")==-1){
                        returnChar = 'docu'
	                }
	                
	                return returnChar;
                },
                liClassVal(){
                	 return "level"+this.num;
                },
                spanClassVal(){
                	 return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
                },
                aClassVal(){
                     return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
                },
                ulClassVal(){
                	return this.isChildren && this.model.children ?"level"+this.num+' line':"level"+this.num;
                }
        	},
            template: 
            `<li :class="liClassVal">
				<span :class="spanClassVal" @click='open(model)'></span>
				<a :class="aClassVal" @click='Func(model)' @contextmenu.prevent='cxtmenufunc'>
				    <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
				    <span :class='model.iconClass' v-show='model.iconClass' v-else></span>
					<span class="node_name">{{model.name}}</span>
				</a>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(i,item) in model.children" :callback='callback' :expandfunc='expandfunc' :model.sync="item" :cxtmenufunc='cxtmenufunc' :num.sync='i' root='1' :nodes.sync='model.children.length' :trees.sync='trees'></ztree-item>
				</ul>
			</li>`
		}
	},
	mounted(){
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    }
}
</script>