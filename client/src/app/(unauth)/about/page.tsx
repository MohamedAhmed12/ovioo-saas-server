"use client";

import AboutStepper from "@/components/About/AboutStepper";
import "@/styles/app/unauth/about-us.scss";
import { Typography } from "@mui/material";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

export default function Home() {
    const statistics: string[] = [
        "<p>Enthusiastic<br />and <strong>devoted</strong></p>",
        "<p><strong>Brave</strong>to express<br />ourselves</p>",
        "<p><strong>Sincere</strong>&amp;<br />straightforward</p>",
    ];

    return (
        <div className="about">
            <div className="intro flex flex-col">
                <div className="container title uppercase text-center">
                    <Typography variant="h2">
                        <span className="text-gradient">
                            <strong>ovioo</strong>
                        </span>
                        <span className="title-span ml-4 mr-4">=</span>
                        <strong>amazing</strong> companies
                        <br />+ <strong>cosmic</strong> designers
                    </Typography>
                </div>

                <AboutStepper />
            </div>
            <div className="info container w-full flex-col lg:flex-row flex items-center justify-between mb-10 pr-2 pl-2 lg:pr-11 lg:pl-11">
                <h2 className="text-[40px] lg:text-5xl font-medium leading-snug basis-1/2 text-center lg:text-left p-0 lg:pr-20">
                    We’ve created an algorithm to help others, matching businesses with the best-fit
                    designers.
                </h2>
                <div className="basis-1/2 mt-8 lg:mt-0">
                    <Image src="/images/smile.jpg" alt="smile" width={610} height={500} />
                </div>
            </div>
            <div className="values section mt-25 mb-20">
                <div className="title-wrapper">
                    <h3 className="text-[30px] font-medium text-center mt-20">Our Values</h3>
                </div>
                <div className="container w-full flex-col  flex items-center justify-between">
                    <div className="basis-1/2 mt-8">
                        <Image src="/images/smile.jpg" alt="smile" width={800} height={720} />
                    </div>
                    <div className="statistics-container flex flex-col lg:flex-row mt-10">
                        {statistics.map((stat, index) => (
                            <div className="statistics-figures flex mt-8 lg:mt0" key={index}>
                                <div className="statistics-number mr-7 lg:mr-4">
                                    <div className="about-figure">{index + 1}</div>
                                </div>
                                <div className="text-statistic">
                                    <div className="down-text text-xl">{ReactHtmlParser(stat)}</div>
                                </div>
                                {statistics.length !== index + 1 && (
                                    <div className="about-statistics-divider hidden lg:block mr-12 ml-12"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}