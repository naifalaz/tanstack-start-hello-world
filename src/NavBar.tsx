import { Link } from '@tanstack/react-router';

export default function NavBar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>
        Home
      </Link>

      <Link to="/products" style={{ marginRight: '1rem' }}>
        Products
      </Link>

      <Link to="/contact">
        Contact
      </Link>
    </nav>
  );
}