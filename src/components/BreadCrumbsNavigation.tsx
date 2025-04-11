import { Breadcrumbs, Link as MuiLink, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Box
      sx={{
        left: 0,
        top: 0,
        marginTop: "6rem",
        width: "100%",
        padding: "0.5rem 2rem",
        position: "fixed",
        zIndex: 90,
      }}
    >
      <Breadcrumbs>
        <MuiLink underline="hover" color="grey" component={Link} to="/">
          Home
        </MuiLink>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="text.primary" key={to}>
              {decodeURIComponent(value)}
            </Typography>
          ) : (
            <MuiLink
              underline="hover"
              color="grey"
              component={Link}
              to={to}
              key={to}
            >
              {decodeURIComponent(value)}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
