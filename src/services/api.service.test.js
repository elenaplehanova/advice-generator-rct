import ApiService from "./api.service";

describe("API service tests:", () => {
    describe("method 'getData'", () => {
        test("not empty", async () => {
            let data = await ApiService.getData("https://api.adviceslip.com/advice");
            expect(data.slip.advice).not.toBe("");
        });
    });

    describe("method 'getRandomAdvice'", () => {
        let data;
        beforeAll(async () => {
            data = await ApiService.getRandomAdvice();
        });

        test("'data' object has 'slip'", async () => {
            expect(data.hasOwnProperty("slip")).toBe(true);
        });
        test("'slip' object has 'advice'", async () => {
            expect(data.slip.hasOwnProperty("advice")).toBe(true);
        });
        test("not empty 'advice'", async () => {
            expect(data.slip.advice).not.toBe("");
        });
    });
});
