import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";

const Auth = () => {

    const [hasAnAccount, setHasAnAccount] = useState(true)

    return <div>
        <form>
            <Box display={"flex"} flexDirection={"column"} maxWidth={800} alignItems="center" justifyContent={"center"}
            margin={"auto"} marginTop={10} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}
                 sx={{
                     ":hover": {
                         boxShadow:"10px 10px 20px #ccc",
                     },
                 }}
            >
                <Typography variant={"h2"} padding={3} textAlign={"center"}>Login</Typography>
                { !hasAnAccount && <TextField margin={"normal"} variant={"outlined"} placeholder={"Name"} type={"text"}></TextField>}
                <TextField margin={"normal"} variant={"outlined"} placeholder={"Email"} type={"email"}></TextField>
                <TextField margin={"normal"} variant={"outlined"} placeholder={"Password"} type={"password"}></TextField>
                <Button variant={"contained"} color={"warning"}
                        sx={{
                            marginTop: 3,
                            borderRadius: 3
                        }}>{hasAnAccount? "Login": "Signup"}</Button>
                <Button
                    onClick={ ()=> setHasAnAccount(!hasAnAccount)}

                        sx={{
                            marginTop: 3,
                            borderRadius: 3
                        }}>{!hasAnAccount? "Back To Login": "Don't have an account?" }</Button>
            </Box>
        </form>
        </div>;
};

export default Auth;