import React, { useContext, useState } from 'react'
import { Context } from '../store/AppContext'

const Home = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("")
    const [image, setImage] = useState(null)

    const [user, setUser] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('username', username)
        formData.append('image', image)

        register(formData)
    }

    const register = form => {
        fetch('http://127.0.0.1:8081/api/register', {
            method: 'POST',
            body: form
        })
            .then((response) => response.json())
            .then((data) => {

                console.log(data)
                setUser(data)
            })
            .catch((error) => console.log(error.message))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3><i className="fa-solid fa-home fa-1x"></i> Home</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <span className='m-2 text-danger'>
                        {store?.name}
                    </span>

                    <button className="btn btn-info" onClick={actions.greetings}>
                        Saludar
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="email" name="username" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <input type="file" name="image" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                <button className="btn btn-warning">
                                    <i className="fa-solid fa-upload"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {
                        !!user &&
                        (
                            <figure>
                                <img src={user.photo} alt="" className="img-fluid rounded-circle photo" />
                                <figcaption>{user.username}</figcaption>
                            </figure>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home