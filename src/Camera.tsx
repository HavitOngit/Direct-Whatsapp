import { useState, useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";


const WbCam = () => {
    const camera = useRef<CameraType | null>(null);
    const [image, setImage] = useState<string>("");
    const [showImage, setShowImage] = useState(false);

    const camHandler = () => {
        setShowImage(!showImage);
        if (!camera.current) {
            return console.error("Camera is null");
        }
        setImage(camera.current.takePhoto("base64url") as string);

    }

    return (
        <div className="flex flex-col gap-10">
            <div className="size-[200px]">
                {showImage && <img src={image} alt="captured" className="object-cover" />}

                {!showImage && <Camera ref={camera} aspectRatio={1 / 1} errorMessages={{
                    noCameraAccessible: "No camera device accessible. Please connect your camera Company and try again.",
                    permissionDenied: "Permission denied. Please refresh and give permission to access the camera.",
                    switchCamera: "Switch camera failed. Please try again.",
                    canvas: "Canvas error. Please try again."
                }} />}
            </div>

            <button onClick={camHandler}>Take photo</button>

        </div>
    );
}

export default WbCam;