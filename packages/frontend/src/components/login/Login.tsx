import React, {useState} from "react";
import CustomPaper from "../custom-paper/CustomPaper";

const Login = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
      <CustomPaper img="login-header-image.jpg">
        <div>
          dsfs
        </div>
      </CustomPaper>
  );
};

export default Login;
