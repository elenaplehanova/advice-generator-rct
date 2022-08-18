import "./loader.scss";

const Loader = () => {
    return (
        <div className="spinner spinner_smal">
            <div className="spinner-eclipse spinner-eclipse_rotating">
                <div className="spinner-eclipse__lines spinner-eclipse__lines_lilac"></div>
            </div>
        </div>
    );
};

export default Loader;
