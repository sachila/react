import { act } from "@testing-library/react-hooks";
import { render, unmountComponentAtNode } from "react-dom";
import TabPanel from "./TabPanel";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("tanPanel", () => {
  let container: any = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders with child elements", () => {
    act(() => {
      render(
        <TabPanel index={0} value={0}>
          <div data-testid="child">render child</div>
        </TabPanel>,
        container
      );
    });

    expect(container.querySelector(`[data-testid="child"]`).textContent).toBe(
      "render child"
    );
  });
});
