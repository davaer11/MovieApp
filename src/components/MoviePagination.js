import { Pagination } from 'react-bootstrap';
const MoviePagination = (props) => {
	let pageItems = [];

	for (let page = 1; page <= props.totalPages; page++) {
		if (
			page === 1 ||
			page === props.totalPages ||
			(page >= props.currentPage - 2 && page <= props.currentPage + 2)
		) {
			pageItems.push(
				<Pagination.Item
					key={page}
					active={page === props.currentPage}
					onClick={() => props.onPageChange(page)}
				>
					{page}
				</Pagination.Item>
			);
		} else {
			if (page === 2 && props.currentPage > 4) {
				pageItems.push(<Pagination.Ellipsis key={`ellipsis-${page}`} />);
			}
			if (
				page === props.totalPages - 1 &&
				props.currentPage < props.totalPages - 3
			) {
				pageItems.push(<Pagination.Ellipsis key={`ellipsis-${page}`} />);
			}
		}
	}

	return (
		<Pagination className='justify-content-center'>
			<Pagination.First onClick={() => props.onPageChange(1)} />
			<Pagination.Prev
				onClick={() => props.onPageChange(props.currentPage - 1)}
				disabled={props.currentPage === 1}
			/>
			{pageItems}
			<Pagination.Next
				onClick={() => props.onPageChange(props.currentPage + 1)}
				disabled={props.currentPage === props.totalPages}
			/>
			<Pagination.Last onClick={() => props.onPageChange(props.totalPages)} />
		</Pagination>
	);
};
export default MoviePagination;
