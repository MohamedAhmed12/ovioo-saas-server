import CircularProgress from "@mui/joy/CircularProgress";
import Image from "next/image";

interface Props {
    className: string;
}

export default function Loading<Props>({ ...props }) {
    return (
        <html lang="en">
            <body className="flex justify-center items-center h-screen bg-[#20212c]">
                <CircularProgress
                    variant="plain"
                    color="primary"
                    sx={{
                        "--_root-size": "150px",
                    }}
                >
                    <Image
                        alt="logo"
                        src="/svg/logo.svg"
                        width={800}
                        height={800}
                        className="p-5"
                    />
                </CircularProgress>
            </body>
        </html>
    );
}
