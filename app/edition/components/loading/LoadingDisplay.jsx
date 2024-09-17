import MoonLoader from "react-spinners/MoonLoader";

export default function LoadingDisplay() {

    return (
        <div className="
        bg-white
        min-w-full
        mt-48
        grid
        place-content-center">
            <MoonLoader size={35} />
        </div>
    );
}