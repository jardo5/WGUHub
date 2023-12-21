import React, {useState} from 'react';
import BackHand from '@material-symbols/svg-500/outlined/back_hand.svg?react';
import {useNavigate} from 'react-router-dom';
import {login} from "../../services/UserService.js";

function SecretLogin() {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const navigate = useNavigate();


    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const role = await login(credentials.username, credentials.password);

            console.log(role);

            if (role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                console.log("not admin");
            }

            console.log("Successful Login");
        } catch (error) {
            console.error("Login error", error);
        }
    };


    return (
        <div className="w-full h-full flex flex-col justify-around items-center my-4">
            <div className="h-44 flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl text-error underline">Super Secret Admin Login</h1>
                <BackHand className="w-20 h-20 fill-error"/>
            </div>
            <section className="items-center justify-center flex">
                <form className="form-control" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <label className="label mt-4">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-error mt-4">Login</button>
                </form>
            </section>
        </div>
    );
}

export default SecretLogin;
