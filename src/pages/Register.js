import { useContext,useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from "sweetalert2";

export default function Register(){

	const { user } = useContext(UserContext);

	// State hooks to store the values of the input fields 
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

    // Check if values are successfully binded
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e){

		// Prevents page redirection via form submission
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				firstName : firstName,
				lastName : lastName,
				email : email,
				mobileNo : mobileNo,
				password : password

			})
		}).then(res => res.json())
		.then(data => {

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);

			if(data.message === "Account registered Successfully"){

				setFirstName("");
				setLastName("");
				setEmail("");
				setMobileNo("");
				setPassword("");
				setConfirmPassword("");

				// alert("Registration successful!");
				Swal.fire({
					title: "Account registered Successfully!",
					text: "Welcome sa tindahan ni Aling Nena!",
					icon: "success"
				  });

			} else if (data.error === "Email invalid"){

				// alert("Email is invalid");
				Swal.fire({
					title: "Email is invalid!",
					text: "Please check your email.",
					icon: "error"
				  });

			} else if (data.error === "Mobile number invalid"){

				// alert("Mobile number is invalid");
				Swal.fire({
					title: "Mobile number is invalid!",
					text: "Please check your mobile number.",
					icon: "error"
				  });

			} else if (data.error === "Password must be atleast 8 characters"){

				// alert("Password must be atleast 8 characters");
				Swal.fire({
					title: "Password must be atleast 8 characters!",
					text: "Please check your password first.",
					icon: "error"
				  });

			} else {

				alert("Something went wrong.")
				Swal.fire({
					title: "Something went wrong!",
					text: "Please try again.",
					icon: "error"
				  });

			}

		})

	}


	useEffect(() => {

		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)){

			setIsActive(true);

		} else {

			setIsActive(false);

		}

	}, [firstName, lastName, email, mobileNo, password, confirmPassword]);
	/*
		- useEffect() has two argument, function and dependency
			- function - represents the side effect you want to perform. This will be executed when the component renders.
			- dependency - optional array. The effect will run when there are changes in the component's dependencies. When there is no provided array, the effect will run on every render of the component.
	*/

	return (

			(user.id !== null) ?
			    <Navigate to="/products" />
			:
				<Form onSubmit={e => registerUser(e)}>
					<h1 className="my-5 text-center">Register</h1>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter First Name"
							value={ firstName }
							onChange={e => setFirstName(e.target.value)}
							required
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Last Name"
							value={ lastName } 
							onChange={e => setLastName(e.target.value)}
							required
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={ email } 
							onChange={e => setEmail(e.target.value)}
							required
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Mobile No.</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter 11 digit number"
							value={ mobileNo } 
							onChange={e => setMobileNo(e.target.value)}
							required
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value={ password } 
							onChange={e => setPassword(e.target.value)}
							required
						 />
					</Form.Group>

					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={ confirmPassword } 
							onChange={e => setConfirmPassword(e.target.value)}
							required
						 />
					</Form.Group>

					{ isActive ? 
						<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
						:
						<Button variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
					}
				</Form>

		)

}