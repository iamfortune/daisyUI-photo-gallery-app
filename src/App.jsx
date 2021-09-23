import { useState, useEffect } from "react";
import axios from "axios";
import Intro from "./components/Intro/Intro";
import Navbar from "./components/Navbar/Navbar";
import Photo from "./components/Photo/Photo";

const App = () => {
	const [selectedCategory, setSelectedCategory] = useState("RANDOM");
	const [photos, setPhotos] = useState([]);
	const [categories] = useState([
		"RANDOM",
		"TECHNOLOGIES",
		"ARTS",
		"SPORTS",
		"GAMES",
	]);

	const fetchRandomPhotos = async () => {
		try {
			const res = await axios.get("https://api.unsplash.com/photos/random", {
				params: {
					client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
					count: 12,
				},
			});
			const photoArr = res.data?.map((photo) => photo?.urls?.regular);
			setPhotos(photoArr);
		} catch (error) {
			setPhotos([]);
			console.error(error?.response?.data?.message);
		}
	};

	const fetchPhotoBasedonCategory = async () => {
		try {
			const res = await axios.get("https://api.unsplash.com/search/photos", {
				params: {
					client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
					query: selectedCategory.toLowerCase(),
				},
			});
			const photoArr = res.data?.results?.map((photo) => photo?.urls?.regular);
			setPhotos(photoArr);
		} catch (error) {
			setPhotos([])
			console.error(error?.response?.data?.message);
		}
	};

	useEffect(() => {
		if (selectedCategory === "RANDOM") {
			return fetchRandomPhotos();
		}
		fetchPhotoBasedonCategory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	return (
		<>
			<Navbar />
			<main className="mb-10">
				<Intro />
				<nav>
					<div className="tabs mt-10 justify-center">
						{categories.map((category) => (
							<p
								key={category}
								onClick={() => setSelectedCategory(category)}
								role="button"
								className={`tab tab-bordered 
							${selectedCategory === category && "tab-active"}`}
							>
								{category}
							</p>
						))}
					</div>
				</nav>
				<section className="mt-4 mx-auto w-10/12 relative">
					<div className="grid grid-cols-3 justify-center gap-3">
						{photos?.length ? (
							photos.map((photo) => <Photo key={photo} imgURL={photo} />)
						) : (
							<p className="mt-10 alert alert-info absolute left-1/2 -ml-20">
								No photo at the moment!
							</p>
						)}
					</div>
				</section>
			</main>
		</>
	);
};

export default App;
