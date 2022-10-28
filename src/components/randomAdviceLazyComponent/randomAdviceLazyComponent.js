import { useEffect, useState } from "react";
import ApiService from "../../services/api.service";
import Loader from "../loader/loader";
import AdviceForm from "../adviceForm/adviceForm";

import "./randomAdviceLazyComponent.scss";

const RandomAdviceLazyComponent = () => {
    const [randomAdvice, setRandomAdvice] = useState();
    useEffect(() => {
        ApiService.getRandomAdvice().then((data) => {
            setRandomAdvice(data.slip.advice);
        });
    }, [randomAdvice]);

    return (
        <div className="random-advice">
            {randomAdvice ? <AdviceForm adviceText={randomAdvice} /> : <Loader />}
        </div>
    );
};

export default RandomAdviceLazyComponent;
