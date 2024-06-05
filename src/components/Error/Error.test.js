import { render, screen } from "@testing-library/react";
import Error from ".";
import userEvent from "@testing-library/user-event";

describe("error bileşenleri testsleri", () => {
  const user = userEvent.setup();
  let comp;

  //foksiyon  mockla
  const retryMock = jest.fn();

  beforeEach(() => {
    //bileşeni renderla
    comp = render(
      <Error message="failed with status code of 404" retry={retryMock} />
    );
  });

  // 1. test
  it(" doğru hata mesajını gösterir", () => {
    comp.getByText(/failed with/i);
  });

  // 2. test
  it(" tekrar dene butonu görevini yapar", async () => {
    //render edilen butonu al
    const button = comp.getByRole("button");

    //buttona tıkla
    await user.click(button);

    //fonksiyon çağrıldı mı?
    expect(retryMock).toHaveBeenCalled();
  });
});
