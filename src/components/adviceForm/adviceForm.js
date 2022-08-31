import { useEffect } from "react";

import "./adviceForm.scss";

const AdviceForm = ({ adviceText }) => {
    useEffect(() => {
        let adviceForm = document.querySelector(".advice-form");
        adviceForm && adviceForm.style.setProperty("--typewriter-characters", adviceText.length);

        let adviceFormText = adviceForm.querySelector(".advice-form__text");
        adviceFormText && adviceFormText.classList.add("advice-form__text_typing");

        return () => {
            adviceFormText && adviceFormText.classList.remove("advice-form__text_typing");
        };
    });

    return (
        <div className="advice-form">
            <p className="advice-form__text text-primary-900">{adviceText}</p>
        </div>
    );
};

export default AdviceForm;
