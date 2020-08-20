import React, {useState} from "react";

const formatName = (user) => {
    return user.firstName + ' ' + user.lastName
}

const UserList = (props) => {

    const [users, setUsers] = useState(props.users);

    const handleAddUser = () => {
        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;

        if (firstName !== "" && lastName !==""){
            setUsers((prevState) => {
                return [
                    ...prevState,
                    {
                        firstName,
                        lastName
                    }
                ]
            })
        }else{
            alert('Complete los datos');
        }
    }

    return (
        <>
            <div>
                <label htmlFor="firstName">Nombre</label>
                <input type="text" id="firstName"/>

                <label htmlFor="lastName">Apellido</label>
                <input type="text" id="lastName"/>

                <button onClick={handleAddUser}>Agregar</button>

            </div>
            <ul>
                {
                    users.map((user, index) => {
                        return <li key={`user-${index}`}>{formatName(user)}</li>
                    })
                }
            </ul>
        </>
    );
}

export default UserList;