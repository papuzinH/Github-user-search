import React from "react";

const GithubItem = (user) => {
	const { avatar_url, login, html_url } = user.user;
	console.log(avatar_url);
	return (
		<a href={html_url} target="_blank" className="github_item">
			<div className="image_container">
				<img src={avatar_url} alt="Profile Image" />
			</div>
            <p>{login}</p>
		</a>
	);
};

export default GithubItem;
