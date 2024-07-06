import { useState, useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { Button } from "./components/ui/button";
import { createWorker } from 'tesseract.js';


// async function useOcr(image: HTMLImageElement, setOcrResult: React.Dispatch<React.SetStateAction<string>>) {
//     const worker = await createWorker('eng', 1, {
//         logger: m => { console.log(m) }
//     });
//     const ret = await worker.recognize(image);
//     if (ret.data.text.length > 0) {
//         setOcrResult(ret.data.text);
//     }
//     console.log(ret.data.text);
//     await worker.terminate();

// }

/**
 * useOCR hook to extract text from image.
 * 
 * Usage:
 * ```tsx
 * //hello
 * const {resultText, extractText} = useOCR()
 * ```
 * @returns resultText, extractText
 */
function useOCR() {
    const [resultText, setResultText] = useState("Scanning...");


    async function extractText(image: HTMLImageElement) {
        setResultText("Scanning...");
        const worker = await createWorker('eng');
        const res = await worker.recognize(image);
        if (res.data.text.length > 0) {
            setResultText(res.data.text);
        } else if (res.data.text.length === 10) {
            const phoneNumber = parseInt(res.data.text);
            if (phoneNumber.toString().length === 10) {
                setResultText(phoneNumber.toString());
                window.location.replace(`https://wa.me/91${phoneNumber}`)
            } else {
                setResultText("Some Numbers Not Recognized. Please Try Again.");

            }
        } else {
            setResultText("Try to Scan Numbers")
        }
        console.log(res.data.text);
        await worker.terminate();
    }
    return { resultText, extractText }
}

const Webcam = () => {
    const camera = useRef<CameraType | null>(null);
    const [image, setImage] = useState<string>("");
    const [showImage, setShowImage] = useState(false);
    const { resultText, extractText } = useOCR();


    const camHandler = async () => {
        if (showImage) {
            setShowImage(!showImage);

            return;
        }
        setShowImage(!showImage);
        if (!camera.current) {
            return console.error("Camera is null");
        }
        setImage(camera.current.takePhoto("base64url") as string);
        const image = new Image();
        image.src = camera.current.takePhoto("base64url") as string;
        image.onload = async () => {
            await extractText(image);
        }

    }

    return (
        <div className="flex flex-col justify-center gap-10">
            <div className="object-cover m-6">
                <img src={image} alt="captured" className={`object-cover animate-pulse ${!showImage ? 'hidden' : ''} `} />
                <div className={`${showImage ? 'hidden' : ''}`}>
                    <Camera ref={camera} aspectRatio={8 / 2} errorMessages={{
                        noCameraAccessible: "No camera device accessible. Please connect your camera Company and try again.",
                        permissionDenied: "Permission denied. Please refresh and give permission to access the camera.",
                        switchCamera: "Switch camera failed. Please try again.",
                        canvas: "Canvas error. Please try again."

                    }} />
                </div>
            </div>
            <p className="font-semibold text-xl">{showImage ? resultText : ''}

            </p>


            <Button onClick={camHandler}>{!showImage ? 'Scan' : 'Retry'}</Button>



        </div>
    );
}

export default Webcam;