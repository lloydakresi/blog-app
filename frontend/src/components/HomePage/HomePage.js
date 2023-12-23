//import { Outlet } from "react-router-dom"
// HomePage.js

import './HomePage.css'; // Import the generated CSS file

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Our Blog Platform</h1>
        <p>
          Explore a world of insightful blogs and share your own thoughts with the community.
        </p>
        <p>
          Whether you're a reader or a writer, we have something for everyone.
        </p>
        <p>
          Get started by <a href="/blogs">browsing blogs</a> or <a href="/signup">creating an account</a>.
        </p>
      </div>
    </div>
  );
}
