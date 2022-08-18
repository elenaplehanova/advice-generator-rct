import "./app.scss";
import Header from "../header/header";
import Main from "../main/main";
import Footer from "../footer/footer";

const App = () => {
    return (
        <div className="app">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default App;
