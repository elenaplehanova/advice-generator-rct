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
        if (searchQuery) {
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
        }

        e.preventDefault();
    };

    const slideChange = (swiper) => {
        let textSwiperSlides = document.querySelectorAll(".advice-form__text");
        let textActiveSlide = textSwiperSlides[swiper.activeIndex];
        if (textActiveSlide) {
            textActiveSlide.classList.remove("advice-form__text_typing");
            setTimeout(() => {
                textActiveSlide.classList.add("advice-form__text_typing");
            }, 100);
        }
    };

    return (
        <div className="search-advice">
            <form className="search-advice__form">
                <input
                    className="search-advice__input"
                    type="search"
                    placeholder="Type a word..."
                    value={searchQuery}
                    autoFocus
                    required
                    onChange={(e) => {
                        setSearchQuery(e.currentTarget.value);
                    }}
                />
                <button
                    className="search-advice__button"
                    type="submit"
                    onClick={handleSubmit}
                ></button>
            </form>

            {isSearched ? (
                <div className="search-results">
                    {message && (
                        <p className="search-results__error-message">
                            {":("} {message} {":("}
                        </p>
                    )}
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        keyboard
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        modules={[Keyboard, Pagination, Navigation]}
                        onSlideChange={(swiper) => slideChange(swiper)}
                    >
                        {foundAdvices &&
                            foundAdvices.map(({ id, advice }) => (
                                <SwiperSlide key={id}>
                                    <div className="swiper__advice-form">
                                        <AdviceForm
                                            className="swiper__advice-form"
                                            adviceText={advice}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            ) : (
                <div className="search-advice__loader">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default SearchAdviceFormLazyComponent;
