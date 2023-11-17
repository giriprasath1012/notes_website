import { useState, useEffect, useContext } from 'react';
import { TiDocumentAdd } from 'react-icons/ti';
import { CgLogOut } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import Note from './Note';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const history = useHistory();

	const { username, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	
	useEffect(() => {
		if (isLoggedIn) getNotes();
	}, [isLoggedIn]);

	const getNotes = () => {
		const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/notes`;
		const options = {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.get(url, options)
			.then((res) => {
				setData(res.data.notes);
				setIsLoading(false);
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.message) {
					setError(error.response.data.message);
				}
				setIsLoading(false);
			});
	};

	const handleLogout = () => {
		const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/logout`;
		const options = {
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.get(url, options)
			.then((res) => {
				setIsLoggedIn(false);
				history.push('/login');
			})
			.catch((error) => console.log(error));
	};

	var noteColors = [
		'bg-red-100',
		'bg-blue-100',
		'bg-yellow-100',
		'bg-green-100',
		'bg-purple-100',
		'bg-rose-100',
		'bg-orange-100',
	];
	var noteColorsCopy = [];
	noteColorsCopy = noteColorsCopy.concat(noteColors);

	const getRandomColor = () => {
		if (noteColorsCopy.length === 0) {
			noteColorsCopy = noteColorsCopy.concat(noteColors);
		}

		const randomIndex = Math.floor(Math.random() * noteColorsCopy.length);
		const color = noteColorsCopy[randomIndex];
		console.log(
			`NoteColors[${randomIndex}] = ${color} (Size: ${
				noteColorsCopy.length - 1
			})`
		);
		noteColorsCopy.splice(randomIndex, 1);

		return color;
	};

	return (
		<div className="h-screen bg-bg-black text-font-main font-Mulish">
			<div className="flex flex-col h-full">
				{/* Title section */}
				<div className="p-4 flex justify-between items-center text-gray-300">
					<h2 className="text-3xl  font-Mulish capitalize">
						{username + "'s"} Notes
					</h2>
					<div className="flex justify-around items-center">
						<div
							className=" rounded-full transition ease-in-out duration-150 text-3xl p-2  flex justify-around items-center cursor-pointer transform hover:-translate-y-1"
							title="Log out"
							onClick={handleLogout}
						>
							<CgLogOut />
							<span className=" hidden md:block ml-1 text-xl">Logout</span>
						</div>
						<div
							className=" rounded-full transition ease-in-out duration-150 text-3xl p-2 flex justify-around items-center cursor-pointer transform hover:-translate-y-1"
							title="Add New Note"
							onClick={() => history.push('/create')}
						>
							<TiDocumentAdd />
							<span className=" hidden md:block ml-1 text-xl">Add Note</span>
						</div>
					</div>
				</div>

				{/* Notes Section */}
				{isLoading ? (
					<h1>LOADING...</h1>
				) : (
					<div className="flex-1 flex flex-col overflow-y-auto">
						<div className="flex-1 p-4 flex flex-col justify-start items-center flex-wrap sm:block">
							{data.map((note) => {
								const bgColor = getRandomColor();
								console.log(`Map : ${bgColor}`);
								return <Note bgColor={bgColor} note={note} key={note._id} />;
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
