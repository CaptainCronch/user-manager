async function getData(){
    const response = await fetch("http://127.0.0.1:5050/users")
    const userList = await response.json()
    console.log(userList)
    populate(userList['users'])
}

function populate(data){
    data.forEach(function(element, index){
        $("tbody").append(`<tr id="i${index}"><td>${element.name}</td><td>${element.email}</td><td>${element.username}</td><td>${element.age}</td><td>${element.uuid}</td>
            <td><button type='button' onclick='editUser("${element.uuid}", "${element.email}", "${element.name}", "${element.username}", ${element.age});return false'>edit</button>
                <button type='button' onclick='deleteUser("${element.uuid}", ${index});return false'>delete</button></td></tr>`);
    });
}

function deleteUser(userID, index){
    fetch("http://127.0.0.1:5050/users", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify({
            'uuid': userID
        }),
    })
    $(`#i${index}`).remove()
}

function editUser(userID, email, legalName, username, age){
    window.location.href = `http://127.0.0.1:5050/edit?uuid=${userID}&email=${email}&name=${legalName}&username=${username}&age=${age}`
}

getData()
