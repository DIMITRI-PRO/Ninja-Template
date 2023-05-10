describe("Test example", () => {
  const a = 1;
  const b = 2;

  test("Should return true", () => {
    expect.hasAssertions();
    expect(true).toBeTruthy();
  });
  test("should equal to 3", () => {
    const result = a + b;
    expect(result).toBe(3);
  });
});
