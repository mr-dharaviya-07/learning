

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Validation } from './validation';
import { Response } from './response';

export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [nameVaild, setNameVaild] = useState('');
    const [emailVaild, setEmailVaild] = useState('');
    const [numberVaild, setNumberVaild] = useState('');
    const [passwordVaild, setPasswordVaild] = useState('');
    const [confimPasswordVaild, setconfimPasswordVaild] = useState('');
    const [response, setResponse] = useState('');
    const [responseError, setResponseError] = useState('');
    const navigate = useNavigate();


    const changeName = () => {
        setNameVaild("");

    }
    const changeEmail = () => {
        setEmailVaild("");
        setResponseError("");
    }

    const changeNumber = () => {
        setNumberVaild("");
        setResponseError("");
    }

    const changePassword = () => {
        setPasswordVaild("");
        setResponseError("");
    }

    const changeconfirmPassword = () => {
        setconfimPasswordVaild("");
    }


    const onSubmit = (event) => {

        event.preventDefault();

        let isVaild = true;
        if (!name) {
            setNameVaild("Enter the Name");
            isVaild = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailVaild(!email ? "Enter the Email" : "Please enter a valid email");
            isVaild = false;
        }
        if (!number || number < 10) {
            setNumberVaild(!number ? 'Enter the Phone Number' : 'Enter the 10 Digit Number');
        }

        if (!password || password.length < 8) {
            setPasswordVaild(!password ? "Enter the Password" : "Password must be at least 8 characters long.");
            isVaild = false;
        }

        if (!confirmPassword) {
            setconfimPasswordVaild("Enter the Confirm Password");
            isVaild = false;
        }

        if (password != confirmPassword) {
            setconfimPasswordVaild("Password Doesn't Match");
            isVaild = false;
        }
        if (!isVaild) {
            return
        }

        const user = {
            userName: name,
            email: email,
            password: password
        }


        const sendData = async () => {

            try {
                const res = await fetch("http://localhost:4000/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                const data = await res.json();

                if (!res.ok) {
                    setResponseError(data.message);
                    return
                }

                setResponse(data.message);
                console.log(data.userId);

                localStorage.setItem('userId', data.userId);
                setTimeout(() => {
                    navigate('/profile');
                }, 1300)

            }
            catch (error) {
                setResponseError(`Error :${error.message}`);
            }
        }
        sendData();

    }

    return (
        <>
            <div className="bg-white h-screen flex justify-center items-center ">
                <form onSubmit={onSubmit} method="post" className="bg-white w-1/2 h-96 flex flex-col items-center justify-evenly rounded-md" style={{ height: "750px" }}>
                    <h1 className="relative top-4 text-blue-600  font-semibold m-2" style={{ fontSize: "42px" }}>Register</h1>


                    {responseError ? <Response value={{ text: responseError, response: "error", alert: true }} /> : response ? <Response value={{ text: response, response: "", alert: true }} /> : null}

                    <div className="flex w-4/5 flex-col m-2 ">
                        <label htmlFor="name" className="text-base p-1 ">Name</label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} onInput={changeName} className={`h-9 rounded-md p-2 border-2 ${nameVaild ? "border-red-400" : "border-black "} `} />
                        {nameVaild && <Validation value={{ text: nameVaild, component: "validation" }} />}
                    </div>

                <div className='flex w-4/5 flex-col lg:flex-row sm:justify-around sm:h-56'>
                    <div className="flex w-full flex-col ">
                        <label htmlFor="email" className="text-base p-1 ">Email Address</label>
                        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} onInput={changeEmail} className={`h-9 rounded-md p-2 border-2 ${emailVaild ? "border-red-400" : "border-black "} `} />
                        {emailVaild && <Validation value={{ text: emailVaild, component: "validation" }} />}
                    </div>

                    <div className="flex w-full flex-col">
                        <label htmlFor="number" className="text-base p-1 ">Phone Number</label>
                        <input type="text" name="number" id="number" onChange={(e) => setNumber(e.target.value)} onInput={changeNumber} className={`h-9 rounded-md p-2 border-2 ${numberVaild ? "border-red-400" : "border-black "} `} />
                        {numberVaild && <Validation value={{ text: numberVaild, component: "validation" }} />}
                    </div>
                </div>

                    <div className="flex w-4/5 flex-col m-2">
                        <label htmlFor="password" className="text-base p-1">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} onInput={changePassword} className={`"h-9 rounded-md p-2 border-2 transition-all ease-in ${passwordVaild ? "border-red-400" : "border-black "} `} />
                        {passwordVaild && <Validation value={{ text: passwordVaild, component: "validation" }} />}
                    </div>

                    <div className="flex w-4/5 flex-col m-2">
                        <label htmlFor="password" className="text-base p-1">Confirm Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setconfirmPassword(e.target.value)} onInput={changeconfirmPassword} className={`"h-9 rounded-md p-2 border-2 transition-all ease-in ${confimPasswordVaild ? "border-red-400" : "border-black "} `} />
                        {confimPasswordVaild && <Validation value={{ text: confimPasswordVaild, component: "validation" }} />}
                    </div>
                    <button type="submit" className="bg-blue-400 p-2 rounded-lg w-4/5 font-medium text-xl m-5 text-white">Register</button>

                </form>
            </div>
        </>
    )
}