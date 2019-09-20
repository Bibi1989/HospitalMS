let sess = sessionStorage.getItem("log")

if(sess){
    let sign = sess
    $.ajax({
        url: `http://localhost:3000/sign/${sess}`,
        method: 'get',
    }).done(data => {
        $('#n').text(`Hi ${data.name}`)
    })
}else{
    window.location = 'index.html'
}