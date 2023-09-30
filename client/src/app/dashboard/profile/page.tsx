"use client";

import DashBoardCard from "@/components/DashBoardCard";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { default as Visibility, default as VisibilityIcon } from "@mui/icons-material/Visibility";
import {
    default as VisibilityOff,
    default as VisibilityOffIcon,
} from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Profile() {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const ValidationTextField = styled(TextField)({
        "& input:valid + fieldset": {
            borderColor: "#E0E3E7",
            borderWidth: 1,
        },
        "& input:invalid + fieldset": {
            borderColor: "red",
            borderWidth: 1,
        },
        "& input:valid:focus + fieldset": {
            borderLeftWidth: 4,
            padding: "4px !important", // override inline-style
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="profilepage px-40 flex flex-col lg:flex-col w-full">
            <div className="profile-card">
                <DashBoardCard handleSubmit={handleSubmit} headerTitle="profile settings">
                    <>
                        <div className="flex flex-row">
                            <div className="basis-1/5 flex flex-col pr-5">
                                <Image
                                    src="https://picsum.photos/id/12/400/400"
                                    width="1500"
                                    height="1500"
                                    alt="profile"
                                    className="rounded-full"
                                />
                                <div className="mt-5 mb-3 flex items-center cursor-pointer">
                                    <AddAPhotoIcon />
                                    <span className="blue-text px-3">Edit photo</span>
                                </div>
                            </div>
                            <div className="basis-4/5 flex flex-col">
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    id="email"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-end mt-5">
                            <Button type="submit" className="dashboard__btn">
                                Update
                            </Button>
                        </div>
                    </>
                </DashBoardCard>
            </div>
            <div className="notification-card">
                <DashBoardCard handleSubmit={handleSubmit} headerTitle="Notification Settings">
                    <>
                        <div className="flex flex-col px-[35px] py-[24px]">
                            <div className="flex flex-row justify-between">
                                <div className="text-base">
                                    Browser push notifications (Updates & Messages from designers)
                                </div>
                                <div>
                                    <Switch {...label} />
                                </div>
                            </div>
                            <div className="md:mt-0 mt-[20px] flex flex-raw">
                                <Image
                                    src="https://res.cloudinary.com/pizdata/image/upload/v1626192951/app/platform/images/i-alert.svg"
                                    width={20}
                                    height={20}
                                    alt="img"
                                />
                                <span className="ml-1 text-aw-gray-400 text-sm font-light">
                                    Unfortunately, this function is not currently available in
                                    Safari
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col px-[35px] py-[24px]">
                            <div className="flex flex-row justify-between">
                                <div className="text-base">
                                    Mail notifications (Updates & Messages from designers)
                                </div>
                                <div>
                                    <Switch {...label} />
                                </div>
                            </div>
                        </div>
                    </>
                </DashBoardCard>
            </div>
            <div className="Security-card">
                <DashBoardCard handleSubmit={handleSubmit} headerTitle="Security Settings">
                    <>
                        <div className="flex flex-col px-[35px] py-[24px]">
                            <div className="flex flex-col">
                                <TextField
                                    className="!m-0 dashboard-input"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Current Password"
                                    id="password"
                                    type="password"
                                />
                                <TextField
                                    required
                                    name="password"
                                    className="!mt-6 dashboard-input"
                                    // error={errors.hasOwnProperty("password")}
                                    // helperText={errors["password"]}
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    // {...bindPassword}
                                />
                                <TextField
                                    required
                                    name="password_confirmation"
                                    className="!mt-6 dashboard-input"
                                    // error={errors.hasOwnProperty("password_confirmation")}
                                    // helperText={errors["password_confirmation"]}
                                    label="Password Confirmation"
                                    type={showPasswordConfirmation ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPasswordConfirmation(
                                                            !showPasswordConfirmation
                                                        )
                                                    }
                                                    edge="end"
                                                >
                                                    {showPasswordConfirmation ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    // {...bindPasswordConfirmation}
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-end mt-5 px-[35px]">
                            <Button type="submit" className="dashboard__btn">
                                Update
                            </Button>
                        </div>
                    </>
                </DashBoardCard>
            </div>
        </div>
    );
}
