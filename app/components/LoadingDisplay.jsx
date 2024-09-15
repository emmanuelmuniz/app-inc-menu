import MoonLoader from "react-spinners/MoonLoader";

export default function LoadingDisplay() {

    return (
        <div className="
        min-w-full
        mt-80
        grid
        place-content-center">
            <MoonLoader size={35} />
        </div>
    );
}