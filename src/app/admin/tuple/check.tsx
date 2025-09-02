'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import clsx from "clsx";
import { toast } from "react-toastify";
import { client } from "@/services/connect/client";

export default function CheckBox() {
    const [checkInput, setCheckInput] = useState<string>("");

    const [parseError, setParseError] = useState<string | null>(null);
    const [triggerShake, setTriggerShake] = useState(false);

    useEffect(() => {
        if (checkInput.length === 0) {
            setParseError(null);
            return;
        }
        const timer = setTimeout(() => {
            console.log("Query input:", checkInput);
            try{
                const out = parseTuple(checkInput);
                setParseError(null);
            }catch(e: unknown){
                console.error(e);
                if (e instanceof Error) {
                    setParseError(e.message || "Invalid query syntax");
                } else {
                    setParseError("An unknown error occurred");
                }
                setTriggerShake(true);
                setTimeout(() => setTriggerShake(false), 500);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [checkInput]);

    const [checkRes, setCheckRes] = useState("");
    const check = async () => {
        try{
            const out = await client.check(parseTuple(checkInput));
            if (out.isAllowed){
                setCheckRes("allowed");
            }else{
                setCheckRes("denied");
            }
            setTimeout(() => setCheckRes(""), 1500); 
        }catch(e: unknown){
            if (e instanceof Error) {
                toast.error(`Failed to check: ${e.message}`);
            } else {
                toast.error("Failed to check: An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex ">
            <Input
                placeholder="user:123#member@role:admin"
                value={checkInput}
                onChange={(e) => setCheckInput(e.target.value)}
                className={clsx(
                    "min-w-64 w-72 transition-all duration-300 bg-white rounded-lg mr-1",
                    parseError && "border border-red-500",
                    triggerShake && "animate-shake"
                )}
            />
            <Button 
                className="bg-violet-950"
                disabled = {checkInput.length === 0}
                onClick={check}
            >Check</Button>
            <div
            className={clsx(
                "ml-0 flex items-center justify-center text-lg",
            )}
            >
            {checkRes && (
                checkRes === "allowed" ? <>✅</> : <>❌</>
            )}
            </div>
        </div>
    )
}

function parseTuple(input: string) {
    // Expected format: sbjNs:sbjId#rel@objNs:objId
    const tupleRegex = /^([^:]+):([^#]+)#([^@]+)@([^:]+):(.+)$/;
    const match = input.match(tupleRegex);

    if (!match) {
        throw new Error("Invalid tuple format");
    }

    const [, objNs, objId, rel, sbjNs, sbjId] = match;

    return { sbjNs, sbjId, rel, objNs, objId };
}