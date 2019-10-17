$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        var html=template('usersTpl',{data:res})
        $('#tbody').html(html)
        
    }
})
$('#userForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(res){
            location.reload()
            
        }
    })
    console.log(formData);
    return false;
    
})
$('#modifyBox').on('change','#avatar',function(){
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        processData:false,
        contentType:false,
        data:fd,
        success:function(res){
            console.log(res);
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src',res[0].avatar);
            
        }
    })
})
$('#tbody').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(res){
            var html = template('modifyTpl',res);
            console.log(html);
            $('#modifyBox').html(html);
            
            
        }
    })
})
$('#modifyBox').on('submit','#modifyForm',function(){
    console.log($(this).serialize());
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload()
        }
    })
    return false;
})
$("#tbody").on('click','.del',function(){
   if(confirm('确定删除吗')){
    var id =$(this).attr('data-id')
    $.ajax({
        type:'delete',
        url:'/users/'+id,
        success:function(){
            location.reload()
        }
    })
   }
})
$('#checkAll').on('change',function(){
    var bool = $(this).prop('checked')
    var checkList=$('#tbody input[type="checkbox"]')
    checkList.prop('checked',bool);
    if(bool==true){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#tbody').on('change','input[type="checkbox"]',function(){
    if($('#tbody input[type="checkbox"]').length==$('#tbody input[type="checkbox"]:checked')
    .length){
        $('#checkAll').prop('checked',true)

    }else{
        $('#checkAll').prop('checked',false)
    }
    if($('#tbody input[type="checkbox"]:checked').length>0){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#deleteAll').on('click',function(){
    if(confirm('确定删除吗')){
        var checkList=$('#tbody input[type="checkbox"]:checked');
        var str=''
        checkList.each(function(index,item){
            str+=$(item).attr('data-id')+'-'
        })
        str=str.substr(0,str.length-1)
        $.ajax({
            type:'delete',
            url:'/users/'+str,
            success: function(){
                location.reload()
            }
        })
    }
   

    
})