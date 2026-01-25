import { PacmanLoader } from "react-spinners";

const Loading = () => {
    return (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <PacmanLoader color="#ff0000" />
        </div>
    )
}

export default Loading;