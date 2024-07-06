import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import App from "./App";
import { Button } from "./components/ui/button";
import Help from "./Help";
import NotFound from "./NotFound";
import logo from "/logo.svg";


function Croute({ urlPath }: { urlPath: string }) {
    history.pushState({}, '', urlPath);
    switch (urlPath) {
        case '/':
            return <App />;
        case '/help':
            return <Help />;
        default:
            return <NotFound />;
    }
}


export default function Routes() {
    const [urlPath, seturlPath] = useState('/');
    addEventListener('popstate', () => {
        console.log(location.pathname + ' popstate');
        seturlPath(location.pathname);
    });

    return (
        <>
            <div className="h-screen">

                <div className="flex justify-between ">
                    <div></div>

                    <Button variant={"link"} onClick={() => seturlPath('/')} className="flex ">
                        <img src={logo} alt="logo" className="h-10 w-10" />
                        <p className="font-bold">uik Chat</p>

                    </Button>


                    <Button variant={"link"} onClick={() => seturlPath('/help')} ><QuestionMarkCircledIcon className="size-5" ></QuestionMarkCircledIcon> </Button>

                </div>
                <Croute urlPath={urlPath} />
            </div>
        </>
    )

}