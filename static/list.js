async function getData(){
    const response = await fetch("http://127.0.0.1:5050/users")
    const userList = await response.json()
    console.log(userList)
    populate(userList['users'])
}

function populate(data){
    data.forEach(function(element, index){
        $("tbody").append(`<tr><td>${element.name}</td><td>${element.email}</td><td>${element.username}</td><td>${element.age}</td><td>${element.uuid}</td>
            <td><button type='button' onclick='editUser(${element.uuid});return false'>edit</button>
                <button type='button' onclick='deleteUser(${element.uuid});return false'>delete</button></td></tr>`);
    });
}

function deleteUser(userID){
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
}

getData()
