import React from "react";
import { motion } from "framer-motion";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import { fadeUp } from "../../style/motion";

const Logo = ({ isFocusedMode }) => {
  return (
    <motion.div
      className="header"
      style={{ visibility: isFocusedMode ? "hidden" : "visible" }}
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <h1>
        Ele Types <KeyboardAltIcon fontSize="large" />
      </h1>
      <span className="sub-header">
        an elegant typing experience, just start typing
      </span>
    </motion.div>
  );
};

export default Logo;
