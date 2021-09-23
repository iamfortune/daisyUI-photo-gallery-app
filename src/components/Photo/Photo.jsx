const Photo = ({ imgURL }) => {
	return (
		<>
			<div className="card">
				<figure>
					<img src={imgURL} alt="unsplash img" />
				</figure>
			</div>
		</>
	);
};

export default Photo;
