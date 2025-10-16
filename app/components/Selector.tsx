"use client"

import { useEffect, useState } from "react";
import Button from "./Button";

interface SelectorProps {
    name: string,
    items: [string, string][],
    clickedItem: string,
    setClickedItem: (value: string) => void
}

export default function Selector(props: SelectorProps) {
    useEffect(() => {
        props.setClickedItem(props.items[0][1]);
    }, []);

    return (
        <div className="flex flex-col gap-[16px]">
            <a className="font-bold text-[20px]">{props.name}</a>
            <div className="flex gap-[12px] flex-wrap">
                {
                    props.items.map((item, index) => {
                        return (
                            <Button 
                                name={item[0]}
                                bg={props.clickedItem === item[1] ? "#1079F9" : "#ffffff"}
                                color={props.clickedItem === item[1] ? "#ffffff" : "#0F172A"}
                                borderColor={props.clickedItem === item[1] ? "#1079F9" : "#e1cbcbff"}
                                key={index}
                                onClick={() => props.setClickedItem(item[1])}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}