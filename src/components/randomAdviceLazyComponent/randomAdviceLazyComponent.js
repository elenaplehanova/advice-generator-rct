import { useEffect, useState } from "react";
import ApiService from "../../services/api.service";
import "./randomAdviceLazyComponent.scss";
import Loader from "../loader/loader";

const RandomAdviceLazyComponent = () => {
    const [randomAdvice, setRandomAdvice] = useState();
    useEffect(() => {
        ApiService.getData("https://api.adviceslip.com/advice").then((data) => {
            setRandomAdvice(data.slip.advice);
        });
    }, []);

    return (
        <div className="random-advice">
            {randomAdvice ? <p className="random-advice__text">{randomAdvice}</p> : <Loader />}
        </div>
    );
};

export default RandomAdviceLazyComponent;
