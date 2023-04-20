import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 data-cy="header-title">TO DO LIST APP</h2>
        </Link>
      </header>
    </div>
  );
}
