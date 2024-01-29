import { Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

const StyledLink = styled(Link)`
  color: #ff0000;  // Set red text color for the link
`;

const StyledNavLink = styled(NavLink)`
  color: #ff0000;  // Set red text color for the nav link
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar>
      <NavItem>
        <StyledLink to="/" className="nav-link">
          Home
        </StyledLink>
      </NavItem>
      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <StyledNavLink onClick={handleLogout}>Logout</StyledNavLink>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  );
};

export default Nav;
