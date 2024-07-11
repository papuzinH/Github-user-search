import React, { useState, useEffect } from "react";
import GithubItem from "./GitHubItem";
import { searchUser } from "../services/GitHubApi";
import Loading from "./Loading";

const GitHubSearch = () => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	// Hook personalizado para debounce
	function useDebounce(effect, delay, deps) {
		useEffect(() => {
			const handler = setTimeout(() => effect(), delay);

			return () => clearTimeout(handler);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [...(deps || []), delay]);
	}

	// Uso del hook personalizado dentro de tu componente
	useDebounce(
		() => {
			setError(null);
			if (query !== "") {
				setLoading(true);

				const fetchData = async () => {
					try {
						const response = await searchUser(query);
						setResults(response.items);
					} catch (error) {
						setError(error);
					} finally {
						setLoading(false);
					}
				};

				fetchData();
			} else {
				setResults([]);
			}
		},
		500,
		[query]
	);

	return (
		<div className="github_search_container">
			<h1>Github User Search</h1>
			<div className="search-container">
				<input
					type="text"
					placeholder="Username"
					onChange={handleChange}
					value={query}
				/>
			</div>
			{loading && <Loading />}
			{error && "Error searching user: " + error}
			<div className="results-container">
				{results.map((user) => {
					return <GithubItem key={user.id} user={user} />;
				})}
			</div>
		</div>
	);
};

export default GitHubSearch;
