import React from "react";
import { Avatar, Box, Paper } from "@mui/material";

type Size = 'small' | 'large';

type CustomPaperStyle = {
    paper: {
        width: string
    }
    banner: {
        height: string
    },
    avatar: {
        width: string,
        height: string,
        bottom: string,
        marginBottom: string
    }
}

const customPaperStyleMap = new Map<Size, CustomPaperStyle>([
    ["small",
        {
            paper: {
                width: "40%"
            },
            banner: {
                height: "120px"
            },
            avatar: {
                width: "128px",
                height: "128px",
                bottom: "64px",
                marginBottom: "-64px"
            }
        }
    ],
    ["large",
        {
            paper: {
                width: "70%"
            },
            banner: {
                height: "230px"
            },
            avatar: {
                width: "256px",
                height: "256px",
                bottom: "128px",
                marginBottom: "-128px"
            }
        }
    ]
])

type CustomPaperProps = {
    size: Size,
    children?: React.ReactNode;
    img?: string;
    avatarImg?: string;
    contentWidth?: string
}

const CustomPaper = (props: CustomPaperProps) => {
    const style = customPaperStyleMap.get(props.size);
    return (
        <Paper
            elevation={5}
            style={style?.paper}
            sx={{
                margin: "30px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "16px",
                backgroundColor: "#FAFAFA",
                paddingBottom: "10px"
            }}
        >
            <Box
                style={style?.banner}
                sx={{
                    width: "100%",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#2FAC90"
                }}
            >
                <img style={{width: "100%", height: "100%", objectFit: "cover", opacity: 0.16}} src={props.img}
                     alt={props.img}/>
            </Box>
            {props.avatarImg &&
                <Avatar
                    alt="Profile Avatar"
                    style={style?.avatar}
                    src={props.avatarImg}
                    sx={{position: "relative", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)"}}
                />
            }
            <Box
                sx={{
                    minHeight: "50px",
                    width: props.contentWidth || '100%',
                }}
            >
                {props.children}
            </Box>
        </Paper>
    )

};

export default CustomPaper;