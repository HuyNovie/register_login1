
import React from 'react'
import './Register.css'
import {Button,Input} from 'antd';
import { Link } from "react-router-dom";
import { useState } from 'react';
import validateEmail from '../utils/validateData';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';


const Register = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        status: 1,
      });
     // kiem tra value co hay khong
      const [fullNameError, setFullNameError] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");

      const validateData = (name, value) => {
        let isValid = true;
        switch(name) {
          case 'fullName':
            if (!value) {
              setFullNameError("Vui lòng điền vào mục này.");
              isValid = false;
            } else {
              setFullNameError("");
            }
            break;
          case 'email':
            if (!value) {
              setEmailError("Vui lòng điền vào mục này.");
              isValid = false;
            } else {
                if(!validateEmail(value)){
                  setEmailError("Email không được định dạng đúng!");
                  isValid = false;  
                }else{
                    setEmailError("")  
                }
            }
            break;
          case 'password':
            if (!value) {
              setPasswordError("Vui lòng điền vào mục này.");
              isValid = false;
              } else {
                const errors = [];
                if (value.length < 5) errors.push("ít nhất 6 ký tự");
                if (!/[a-z]/.test(value)) errors.push("chữ thường");
                if (!/[A-Z]/.test(value)) errors.push("chữ hoa");
                if (!/\d/.test(value)) errors.push("ký tự số");
                if (!/[^A-Za-z0-9]/.test(value)) errors.push("ký tự đặc biệt");
                if (errors.length > 0) {
                  setPasswordError(`Cần ${errors.join(', ')}`);
                  isValid = false;
                } else {
                  setPasswordError("");
                }
            }
            break;
          default:
            break;
        }
        return isValid;
      };
        //
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
        validateData(name, value);
      }; 
    
      const handleSubmit = (e) => {
       e.preventDefault();
       
        const fullNameValid = validateData("fullName", user.fullName);
        const emailValid = validateData("email", user.email);
        const passwordValid= validateData("password", user.password);
        
        
        // if (fullNameValid && emailValid && passwordValid){
        //   // Goi API dang ki
         
        // }

      };



       //show password
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };


  //form dang ki    
  return (
    <div className='wrapper'>
    <form onSubmit={handleSubmit}>
        <h1>Đăng kí</h1>
        <div className='form-group'>
            <Input type='text' name="fullName" onChange={handleChange} status = {fullNameError ? 'error' : ''} placeholder='Họ và Tên' />
            {fullNameError &&(
                 <p className='error-message'>{fullNameError}</p>
            )}
           
        </div>
        <div className='form-group'>
            <Input type='email' name="email" onChange={handleChange} status = {emailError? 'error' : ''}placeholder='Email' />
            {emailError &&(
                 <p className='error-message'>{emailError}</p>
            )}
            
        </div>

        <div className='form-group'>
            <Input type={passwordShown ? "text" : "password"} name="password" onChange={handleChange} status = {passwordError ? 'error' : ''} placeholder='Mật khẩu' />
            <span onClick={togglePasswordVisibility} className='items-form'>
                    {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError &&(
                 <p className='error-message'>{passwordError}</p>
            )}
        </div>
        <div>
            <Button htmlType='submit' type='primary'>
                Đăng kí
            </Button>
        </div> 
        
        <div className='login-link' >
            <div>Bạn đã có tài khoản chưa?
            <Link to= "/login" className='text-login'>Đăng nhập</Link> 
            </div>
            
        </div>
    </form>
</div>
  );
}
export default Register
