import { Container, Alert, Button } from 'react-bootstrap';
import { useRouteError } from 'react-router';
import { Link } from 'react-router-dom';
const SearchResultsError = () => {
	const error = useRouteError();

	return (
		<Container className='mt-5'>
			<Alert variant='danger' className='text-center'>
				<Alert.Heading style={{ fontSize: '50px', marginBottom: '40px' }}>
					Not found
				</Alert.Heading>
				<strong>{error.message}</strong>
				<Link to='/' style={{ paddingLeft: '20px' }}>
					<Button variant='outline-secondary'>Go back</Button>
				</Link>
			</Alert>
		</Container>
	);
};
export default SearchResultsError;
