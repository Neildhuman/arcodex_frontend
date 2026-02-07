import {Form,Button} from 'react-bootstrap';


export default function UpdateUserProfile(){

return(

	<Form>
		<Form.Group>
			<h1>Update Profile</h1>
				<Form.Label>First Name</Form.Label>
					<Form.Control type='text' />
				<Form.Label>Last Name</Form.Label>
					<Form.Control type='text' />
				<Form.Label>Mobile Number</Form.Label>
					<Form.Control type='number' />
				<Button variant='primary'type='submit'>Update Profile</Button>
		</Form.Group>
	</Form>


	)
}