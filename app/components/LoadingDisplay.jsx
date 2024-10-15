import MoonLoader from "react-spinners/MoonLoader";

export default function LoadingDisplay() {

    return (
        <div className="
            fixed 
            inset-0 
            flex 
            justify-center 
            items-center">
            <MoonLoader size={35} />
        </div>
    );
}