$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html=template('categoriesTpl',{data:res})
        $('#categoryBox').html(html)
    }
})

$('#addCategory').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/categories',
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    })
    return false;
})

$('#categoryBox').on('click','.edit',function(){
    var id= $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            var html=template('modifyCategoryTpl',res)
            $('#modifyBox').html(html)
            
        }
    })
})

$('#modifyBox').on('submit','#modifyCategory',function(){
    var id =$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload()
        }
    })
    return false;
})
