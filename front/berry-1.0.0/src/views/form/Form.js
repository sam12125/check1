import React, {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import './form.css'

function Form() {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [carType, setCartype] = useState('');
    const [carModel, setCarmodel] = useState('');
    const [userData, setUserdata] = useState([]);
    let dataOfcar = {country: '', state: '', city: '', carType: '', carModel: ''};
    let data = [];

    const postData = async (event) => {
        event.preventDefault();
        dataOfcar = {country: country, state: state, city: city, carType: carType, carModel: carModel};
        data.push(dataOfcar);
        console.log('data', dataOfcar);

        await fetch("http://localhost:5000/insert",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataOfcar),
          })
          .catch(error => {
            console.log("error")
            window.alert(error);
            return;
          })
        window.location.reload()
    };

    const fetchData = () => {
        axios.get('http://localhost:5000/read').then(
            (response) => {
                data = response.data;
                // console.log(response.data.items)
                setUserdata(data);
                console.log('data coming', userData);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        await fetch(`http://localhost:5000/delete?id=${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .catch(error => {
            window.alert(error);
            return;
          })
          window.location.reload()
        // setUserdata(userData.filter((elem) => elem.id !== id));
        // console.log('filter', userData);
    };

    return (
        <div>
            <form style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '50%', flexDirection: 'column'}}>
                <select name="country" onChange={(e) => setCountry(e.target.value)} style={{marginBottom: '-12px'}}>
                    <option value="">Select</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
                <br></br>
                <input type="text" placeholder="Enter State" onChange={(e) => setState(e.target.value)} style={{marginBottom: '5px'}} />
                <input type="text" placeholder="Enter City" onChange={(e) => setCity(e.target.value)} style={{marginBottom: '5px'}} />
                <input
                    type="text"
                    placeholder="Enter Car Type"
                    onChange={(e) => setCartype(e.target.value)}
                    style={{marginBottom: '5px'}}
                />
                <input
                    type="text"
                    placeholder="Enter Car Model"
                    onChange={(e) => setCarmodel(e.target.value)}
                    style={{marginBottom: '5px'}}
                />
                <br></br>
                <input type="Submit" style={{marginTop: '-15px'}} onClick={postData} />
            </form>

            <div>
                <table style={{width: '90%', margin: 'auto', marginTop: '3%', border: '1px solid black'}}>
                    <thead>
                        <tr  className='th'>
                            <th className='th'>Id</th>
                            <th className='th'>Country</th>
                            <th className='th'>State</th>
                            <th className='th'>City</th>
                            <th className='th'>Car type</th>
                            <th className='th'>Car model</th>
                            <th className='th'>Delete</th>
                        </tr>
                    </thead>

                    {userData.map((elem, i) => (
                        <tbody key={elem._id}>
                            <tr  className='th'>
                                <td className='td'>{elem._id}</td>
                                <td className='td'>{elem.country}</td>
                                <td className='td'>{elem.state}</td>
                                <td className='td'>{elem.city}</td>
                                <td className='td'>{elem.carType}</td>
                                <td className='td'>{elem.carModel}</td>
                                <td className='td' onClick={() => handleDelete(elem._id)}>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default Form;
