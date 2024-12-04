const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
  palette:{
    mode: "dark",
    primary:{
      main: "#ED1C24"
    },
    secondary:{
      main: "#5A20CB"
    },
    black:{
      main: "#0D0D0D"
    },
    background:{
      main: "#FFFFFF",
      default: "#FFFFFF", // chỉnh màu background toàn trang
      paper: "#FFFFFF" // chỉnh màu cho thẻ restaurant ngoài home
    },
    textColor:{
      main: "#000000"
    }
  }
})