import "./adviceForm.scss";

const AdviceForm = ({ adviceText }) => {
    return (
        <div className="advice-form">
            <span
                className="advice-form__text text-primary-900 advice-form__text_typing"
                style={{ "--typewriter-characters": `${adviceText.length}` }}
            >
                {adviceText}
            </span>
        </div>
    );
};

export default AdviceForm;
