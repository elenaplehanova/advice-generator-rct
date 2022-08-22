import { useEffect, useState } from "react";
import ApiService from "../../services/api.service";
import Loader from "../loader/loader";
import AdviceForm from "../adviceForm/adviceForm";

import "./randomAdviceLazyComponent.scss";

const RandomAdviceLazyComponent = () => {
    const [randomAdvice, setRandomAdvice] = useState();
    useEffect(() => {
        ApiService.getData("https://api.adviceslip.com/advice").then((data) => {
            setRandomAdvice(data.slip.advice);
        });
    }, []);

    return (
        <div>
            {randomAdvice ? (
                <AdviceForm className="advice-form" adviceText={randomAdvice} />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default RandomAdviceLazyComponent;
