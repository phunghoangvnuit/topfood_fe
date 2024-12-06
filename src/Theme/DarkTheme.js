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
      main: "#000000"
    },
    background:{
      main: "#000000",
      default: "#FFFFFF", // chỉnh màu background toàn trang
      paper: "#FFFFFF" // chỉnh màu cho thẻ restaurant ngoài home
    },
    textColor:{
      main: "#000000"
    }
  }
})


// gray: #D4D4D4
// dark-gray: #9E9E9E