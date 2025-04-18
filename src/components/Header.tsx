import VolvoIronMark from "../assets/VolvoIronMark.svg";
import VovloLogo from "../assets/VovloLogo.svg";

import { Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:620px)");

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2rem",
        zIndex: "100",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {isSmallScreen ? (
          <img
            src={VolvoIronMark}
            alt="Volvo Logo"
            style={{
              height: "2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        ) : (
          <img
            src={VovloLogo}
            alt="Volvo Logo"
            style={{
              height: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        )}
      </div>

      <div
        style={{
          flex: 1,
          fontSize: "2rem",
          fontFamily: "VolvoBroad",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {isSmallScreen ? "VGCS" : "Vovlo Group Connected Solutions"}
      </div>

      <div
        style={{
          flex: 1,
          marginRight: "3rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Cache
        </Button>
      </div>
    </div>
  );
};

export default Header;
