import React, {useEffect, useState} from "react";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [completed, setComleted] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [ windowWidth, setWindowWidth ] = React.useState( window.innerWidth );

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((data) => {
                console.log('data', data);
                return data.json();
            })
            .then((dataJSON)=>{
                console.log('dataJSON', dataJSON);
            })
    });

    useEffect(() => {
        console.log('efecto', todos.length);
        if (todos.length > 0) {
            document.title = `${todos.length} tareas pendientes`;
        } else {
            document.title = `No tienes tareas pendientes`;
        }
    }, [todos]);

    useEffect(()=> {
        console.log('cambio de color de fondo', darkMode)

        if (darkMode){
            console.log('DARK')
        } else {
            console.log('LIGHT')
        }

    }, [darkMode])

    useEffect(() => {
        console.log('Inicio del efecto')
        window.addEventListener('resize', handleResize)

        return () => {
            console.log('Limpieza del efecto');
            window.removeEventListener('resize', handleResize);
        }
    })

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    const handleAddTask = () => {
        const task = document.querySelector('#task').value;
        if (task !== '') {
            setTodos(prevState => [...prevState, task]);
            document.querySelector('#task').value = '';
        } else {
            alert('Ingrese una tarea');
        }
    };

    const handleDeleteTask = (index) => {
        setTodos((prevState) => {
            return prevState.filter((task, i) => i !== index);
        });
    };

    const handleCompleteTask = (index) => {
        setComleted((prevState) => [
                ...prevState,
                todos[index]
            ]
        );
        handleDeleteTask(index);
    };

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className ={darkMode
            ? 'dark-mode'
            : ''}>

            <div>
                El ancho de la ventana es: {windowWidth}
            </div>
            <div>
                <button onClick={handleDarkMode}>
                    {
                        darkMode ? 'Modo Claro' : 'Modo Oscuro'
                    }
                </button>
            </div>
            <div>
                <label htmlFor='task'>Tarea</label>
                <input type='text' id='task'/>

                <button onClick={handleAddTask}>Agregar Tarea</button>
            </div>

            <h2>Lista de tareas pendientes ({todos.length} en total)</h2>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Eliminar</th>
                    <th>Completar</th>
                </tr>
                </thead>

                <tbody>
                {
                    todos.map((task, index) => (
                            <tr key={index}>
                                <td>{task}</td>
                                <td>
                                    <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
                                </td>
                                <td>
                                    <button onClick={() => handleCompleteTask(index)}>Completado</button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>

            <h2>Lista de tareas completadas ({todos.length} en total)</h2>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {
                    completed.map((task, index) => (
                        <tr key={index}>
                            <td>{task}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
}

export default TodoList;