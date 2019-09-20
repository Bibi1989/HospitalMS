$(document).ready(function() {
    // A variable to show data of update
    let detail_div = null;

    // Event to handle submitting
    $("#form").submit(e => {
        e.preventDefault()
        let name = $("#names").val()
        let email = $("#email").val()
        let phone = Number($("#phone").val())
        let dob = $("#date").val()
        let other = $("#other").val()
        let med1 = $("input[name=medication]:checked").val()
        let allergy = $("input[name=allergy]:checked").val()
        let gender = $("input[name=gender]:checked").val()
        let tob = $("#tob").val()
         
        // Posting fields to json server
        if(name == '' || email == '' || phone == '' || dob == '' || other == '' || med1 == '' || allergy == '' || gender == '' || tob == '' ){
            alert("fill all fields")
        }else{
            $.ajax({
                url: "http://localhost:3000/patient",
                method: "post",
                data: {
                    name, email, phone, dob, other, med1, allergy, gender, tob
                }
            }).done(data => {
                // Empty fields after submitting
                $("#names").val('')
                $("#email").val('')
                $("#phone").val('')
                $("#date").val('')
                $("#other").val('')
                $("#med1").val('')
                $("#allergy").val('')
                $("#gender").val('')
                $("#tob").val('')

                // Showing patients details
                $("#row").append(
                    `
                    <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h2>Name: ${data.name}</h2>
                                <p>Email: ${data.email}</p>
                                <p>Phone: ${Number(data.phone)}</p>
                                <p>Date Of Birth: ${data.dob}</p>
                                <p>Health Status: ${data.other}</p>
                            </div>
                            <button class="btn btn-warning my-2" id="view">View</button>
                            
                            <button class="btn btn-danger my-2" id="delete-${data.id}">Delete</button>
                        </div>
                    </div>
                    `
                )
                alert("Registered Successfully");
            })
        } 
    })


    
    $.ajax({
        url: "http://localhost:3000/patient",
        method: "get",
    }).done(data => {
        for(let i = 0; i < data.length; i++) {
            console.log(data[i].id)
            $("#row").append(
                `
                <div class="col-4 col-lg-4 col-md-6 col-sm-6 col-xs-10">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h2>Name: ${data[i].name}</h2>
                            <p>Email: ${data[i].email}</p>
                            <p>Phone: ${data[i].phone}</p>
                            <p>Date Of Birth: ${data[i].dob}</p>
                            <p>Health Status: ${data[i].other}</p>
                        </div>
                        <button class="btn btn-warning my-2" data-toggle="modal" data-target="#view" id="view-${data[i].id}">View</button>
                        <button class="btn btn-primary my-2" data-toggle="modal" data-target="#update" id="update-${data[i].id}">Update</button>
                        <button class="btn btn-danger my-2" id="delete-${data[i].id}">Delete</button>
                    </div>
                </div>
                `
            )
        }
        $(".btn-danger").on("click", (event) => {
            let deleteId = event.target.id.split("delete-").join("")
            $.ajax({
                url: `http://localhost:3000/patient/${deleteId}`,
                method: "delete",
            }).done(() => {
                alert("Deleted")
            })
        })

        $(".btn-primary").on("click", (event) => {
            let updateId = event.target.id.split("update-").join("")
            $(".update-button").attr("id", updateId);
            $.ajax({
                url: `http://localhost:3000/patient/${updateId}`,
                method: "get",
            }).done(data => {
                detail_div = $(".btn-primary").parent().children("div")[0];
            })
            
        })

        $(".btn-warning").on("click", (event) => {
            let viewId = event.target.id.split("view-").join("")
            $.ajax({
                url: `http://localhost:3000/patient/${viewId}`,
                method: "get",
            }).done((data) => {
                    $(".view").html(
                        `
                        <div class="card-body">
                            <h2>Name: ${data.name}</h2>
                            <p>Email: ${data.email}</p>
                            <p>Phone: data.phone}</p>
                            <p>Date Of Birth: ${data.dob}</p>
                            <p>Health Status: ${data.other}</p>
                            <p>Currently on Medicine: ${data.med1}</p>
                            <p>Any Allergy: ${data.allergy}</p>
                            <p>Gender: ${data.gender}</p>
                            <p>Any history of tobacco: ${data.tob}</p>
                        </div>
                    `
                    )
            })
        })
    })
    
    //This is used to update the record in the database
})


            