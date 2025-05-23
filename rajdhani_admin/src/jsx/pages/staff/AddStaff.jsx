import React,{useState} from 'react';
import Select from 'react-select';
import { DatePicker } from 'rsuite';

import PageTitle from '../../layouts/PageTitle';



const options = [
    { value: '1', label: 'Gender' },
    { value: '2', label: 'Male' },
    { value: '3', label: 'Female' }
]

const options1 = [
    { value: '1', label: 'Department' },
    { value: '2', label: 'HTML' },
    { value: '3', label: 'CSS' },
    { value: '4', label: 'JavaScript' },
    { value: '4', label: 'Angular' },
    { value: '4', label: 'React' },
    { value: '4', label: 'VueJs' },
    { value: '4', label: 'Ruby' },
    { value: '4', label: 'PHP' },
    { value: '4', label: 'ASP.NET' },
    { value: '4', label: 'Python' },
    { value: '4', label: 'MySQL' }
]

const AddStaff = () => {
    const [changeText, setChangeText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <PageTitle activeMenu={"Add Staff"} motherMenu={"Staff"} />
            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Basic Info</h5>
                        </div>
                        <div className="card-body">
                            <form action="#" method="post" id="addStaffForm">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="first_name">First Name</label>
                                            <input placeholder="Enter First Name" id="first_name" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="last_name">Last Name</label>
                                            <input placeholder="Enter Last Name" id="last_name" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email_here">Email</label>
                                            <input placeholder="Enter Email" id="email_here" type="email" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="datepicker">Joining Date</label>
                                            <div className="input-hasicon mb-xl-0 mb-3">    
                                                <DatePicker 
                                                    placeholder="Joining Date" 
                                                    className="picker-suit"
                                                />
                                                <div className="icon"><i className="far fa-calendar" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <div className="input-group pass-group">
                                                <input placeholder="Password"  
                                                    type={showPassword ? "text" : "password"} 
                                                    className="form-control pass-input" required 
                                                />
                                                <span className={`input-group-text pass-handle ${showPassword ? "active" : ""}`}
                                                    onClick={()=>setShowPassword(!showPassword)}
                                                > 
                                                    <i className="fa fa-eye-slash"></i>
                                                    <i className="fa fa-eye"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                            <div className="input-group pass-group">
                                                <input placeholder="Confirm Password"  
                                                    type={changeText ? "text" : "password"} 
                                                    className="form-control pass-input" required 
                                                />
                                                <span className={`input-group-text pass-handle ${changeText ? "active" : ""}`}
                                                    onClick={()=>setChangeText(!changeText)}
                                                > 
                                                    <i className="fa fa-eye-slash"></i>
                                                    <i className="fa fa-eye"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="mobile_number">Mobile Number</label>
                                            <input placeholder="Mobile Number" id="mobile_number" type="number" maxLength="10" name="phoneNumber" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label">Gender</label>                                          
                                            <Select 
                                                isSearchable={false}
                                                defaultValue={options[0]}
                                                options={options} 
                                                className="custom-react-select" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="designation">Designation</label>
                                            <input placeholder="Designation" id="designation" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label">Department</label>
                                            <Select 
                                                isSearchable={false}
                                                defaultValue={options1[0]}
                                                options={options1} className="custom-react-select" 
                                            />                                            
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="datepicker1">Date of Birth</label>
                                            <div className="input-hasicon mb-xl-0 mb-3">                                               
                                                <DatePicker 
                                                    placeholder="Date of Birth" 
                                                    className="picker-suit"
                                                />
                                                <div className="icon"><i className="far fa-calendar" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="education">Education</label>
                                            <input placeholder="Education" id="education" type="text" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="Address">Address</label>
                                            <textarea id="Address" className="form-control" rows="5" required></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="form-group fallback w-100">
                                            <input type="file" className="form-control" data-default-file="" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <button type="submit" className="btn btn-primary me-1">Submit</button>
                                        <button type="submit" className="btn btn-danger light">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddStaff;