const ApiService = {
    async getData(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    },
    async getRandomAdvice() {
        let url = "https://api.adviceslip.com/advice";
        const data = ApiService.getData(url);

        return data;
    },
};

export default ApiService;
