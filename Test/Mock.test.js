const {Random, FarenheitToCelcius, CelciusToFarenheit} = require("../src/TestMock");

test("This calculates a random math", () => {
    const value = Random(4, 2);
    expect(value).toBe(-6);
});

test("Should convert 32F to 0C", () => {
    const temp = FarenheitToCelcius(32);
    expect(temp).toBe(0);
});

test("Should convert 0C to 32F", () => {
    const temp = CelciusToFarenheit(0);
    expect(temp).toBe(32);
});

// test("Async Test demo", (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });