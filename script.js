 // Modal elementlarini olish
 const modal = document.getElementById("modalForAdd");
 const openModalBtn = document.querySelector(".btn-add");
 const closeModalBtn = document.querySelector(".close");

 // Modalni ochish
 openModalBtn.addEventListener("click", function() {
     modal.style.display = "block";
 });

 // Modalni yopish
 closeModalBtn.addEventListener("click", function() {
     modal.style.display = "none";
 });

 // Modalni tashqariga bosganda yopish
 window.addEventListener("click", function(event) {
     if (event.target === modal) {
         modal.style.display = "none";
     }
 });

 // Foydalanuvchini qo'shish tugmasi
 document.getElementById("saveUser").addEventListener("click", function() {
     const firstName = document.getElementById("firstName").value;
     const lastName = document.getElementById("lastName").value;
     const email = document.getElementById("email").value;
     const phone = document.getElementById("phone").value;

     console.log("Yangi foydalanuvchi:", { firstName, lastName, email, phone });

     // Modalni yopish
     modal.style.display = "none";
 });








const API = "http://localhost:3000/users";

// CRUD qismi 


// ************ read qismi ***************
const getData = async (resource) => {
    const request = await fetch(resource);
    const data = request.json();
    return data;
}


let tableBody = document.querySelector(".table-body");

getData(API)
    .then((data) => {
        for (let el of data) {
            let tr = document.createElement("tr")
            tableBody.appendChild(tr)
            let tdId = document.createElement("td")
            let tdFirstname = document.createElement("td")
            let tdLastname = document.createElement("td")
            let tdEmail = document.createElement("td")
            let tdPhone = document.createElement("td")
            let tdLocation = document.createElement("td")
            let tdHobby = document.createElement("td")

            
            let tdAction = document.createElement("td")
            let btnEdit = document.createElement("button")
            btnEdit.textContent = "Edit"
            btnEdit.classList.add("btn", "btn-edit")

            let btnRemove = document.createElement("button")
            tdAction.appendChild(btnEdit)
            btnRemove.textContent = "Del"
            btnRemove.classList.add("btn", "btn-delete")

            tdAction.appendChild(btnRemove)
            tdAction.classList.add("action-cell")


            tr.appendChild(tdId)
            tr.appendChild(tdFirstname)
            tr.appendChild(tdLastname)
            tr.appendChild(tdEmail)
            tr.appendChild(tdPhone)
            tr.appendChild(tdLocation)
            tr.appendChild(tdHobby)
            tr.appendChild(tdAction)

            tdId.textContent = el.id;
            tdFirstname.textContent = el.firstname;
            tdLastname.textContent = el.lastname;
            tdEmail.textContent = el.email;
            tdPhone.textContent = el.phone;
        }
    })
    .catch((err) => {
        console.error(err)
    })









// ************ create qismi ***************

let saveUser = document.getElementById("saveUser");
console.log(saveUser);

async function addUser(resource) {
    try {
        const request = await fetch(resource, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": "5",
                "firstname": "Nosirjon",
                "lastname": "Yunusjonov",
                "email": "nosirjon12@gmail.com",
                "phone": "98 888 78 88"
            })
        })

        if (!request.ok) {
            throw new Error(`HTTP error! Status: ${request.status}`)
        }

        const data = await request.json();
        console.log("User added: ", data);
    } catch(error) {
        console.log("Error posting user: ", error);
    }
}

saveUser.addEventListener("click", () => {
    addUser(API)
})



