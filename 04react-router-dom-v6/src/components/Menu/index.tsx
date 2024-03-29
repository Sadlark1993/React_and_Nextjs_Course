import { Link } from "react-router-dom";
import "./style.css";

export const Menu = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/" state={"This is the state from the menu bar."}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
				<li>
					<Link to="/posts/10">Post 10</Link>
				</li>
				<li>
					<Link to="/redirect">Redirect</Link>
				</li>
			</ul>
		</nav>
	);
};
