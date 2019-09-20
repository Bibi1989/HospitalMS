//This is used to update the record in the database
$(".update-button").on("click", (event) => {
    event.preventDefault()
    let name = $("#names").val()
    let email = $("#email").val()
    let phone = Number($("#phone").val())
    let dob = $("#date").val()
    let other = $("#other").val()
    let med1 = $("#med1").val()
    let allergy = $("input[name=allergy]:checked").val()
    let gender = $("input[name=gender]:checked").val()
    let tob = $("#tob").val()
    let updateId = event.target.id.split("update-").join("")
    $.ajax({
        url: `http://localhost:3000/patient/${updateId}`,
        method: "patch",
        data: {
            name, email, phone, dob, other, med1, allergy, gender, tob
        },
        success: () => {
            alert("Updated");
            window.location.assign('details.html')
            detail_div.children[0].innerHTML = "Name: " + name;
            detail_div.children[1].innerHTML = "Email: " + email;
            detail_div.children[2].innerHTML = "Phone: " + phone;
            detail_div.children[3].innerHTML = "Date Of Birth: " + dob;
            detail_div.children[4].innerHTML = "Health Status: " + other;
            detail_div.children[5].innerHTML = "Currently on Medicine: " + med1;
            detail_div.children[6].innerHTML = "Any Allergy: " + allergy;
            detail_div.children[7].innerHTML = "Gender: " + gender;
            detail_div.children[8].innerHTML = "Any history of tobacco: " + tob;
            alert(med1)
            
        },
        error: () => {
            alert("Update Failed");
        }
    })
})