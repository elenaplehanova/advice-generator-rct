import "./adviceForm.scss";

const AdviceForm = ({ adviceText }) => {
    return (
        <div className="advice-form">
            <span
                className="ff-mono advice-form__text advice-form__text_typing"
                style={{ "--typewriter-characters": `${adviceText.length}` }}
            >
                {adviceText}
            </span>
        </div>
    );
};

export default AdviceForm;
