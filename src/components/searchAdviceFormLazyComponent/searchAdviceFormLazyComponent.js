import { useState } from "react";
import ApiService from "../../services/api.service";
import Loader from "../loader/loader";
import { Keyboard, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AdviceForm from "../adviceForm/adviceForm";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./searchAdviceFormLazyComponent.scss";

const SearchAdviceFormLazyComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [foundAdvices, setFoundAdvices] = useState([]);
    const [isSearched, setIsSearched] = useState(true);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        setIsSearched(false);
        setTimeout(() => {
            ApiService.getData(`https://api.adviceslip.com/advice/search/${searchQuery}`).then(
                (data) => {
                    data.message ? setMessage(data.message.text) : setMessage("");
                    data.slips ? setFoundAdvices(data.slips) : setFoundAdvices([]);

                    setIsSearched(true);
                }
            );
        }, 1000);

        e.preventDefault();
    };

    return (
        <div className="search-advice">
            <form className="search-advice__form">
                <input
                    className="search-advice__input"
                    type="search"
                    placeholder="Type a word..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.currentTarget.value);
                    }}
                />
                <button className="search-advice__button" type="submit" onClick={handleSubmit}>
                    Search
                </button>
            </form>

            {isSearched ? (
                <div className="search-results">
                    {message && <p className="search-results__error-message">{message} </p>}
                    <div className="swiper-container">
                        <Swiper
                            className="swiper"
                            slidesPerView={1}
                            spaceBetween={30}
                            keyboard={{
                                enabled: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Keyboard, Pagination, Navigation]}
                        >
                            {foundAdvices &&
                                foundAdvices.map(({ id, advice }) => (
                                    <SwiperSlide className="swiper-slide" key={id}>
                                        <p> </p>
                                        <AdviceForm adviceText={advice} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default SearchAdviceFormLazyComponent;
